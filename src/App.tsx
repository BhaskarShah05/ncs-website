
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  Menu,
  X,
  Home as HomeIcon,
  Info,
  FolderGit2,
  Users,
  GraduationCap,
  UserPlus,
  ArrowUpRight,
  Hand,
} from "lucide-react";
import About from "./pages/About";
import Alumni from "./pages/Alumni";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Recruitment from "./pages/Recruitment";
import Team from "./pages/Team";
import { EtherealBeamsBackground } from "./components/ui/ethereal-beams-hero";
import WebsiteLoader from "./components/WebsiteLoader";

type Route = "home" | "about" | "project" | "team" | "alumni" | "recruitment";

const routes: Record<Route, { component: () => React.JSX.Element; height: number }> = {
  home: { component: Home, height: 4200 },
  about: { component: About, height: 3500 },
  project: { component: Project, height: 2600 },
  team: { component: Team, height: 7500 },
  alumni: { component: Alumni, height: 11000 },
  recruitment: { component: Recruitment, height: 2100 },
};

const navItemsList = [
  { label: "Home", route: "home" as Route, icon: HomeIcon },
  { label: "About", route: "about" as Route, icon: Info },
  { label: "Project", route: "project" as Route, icon: FolderGit2 },
  { label: "Team", route: "team" as Route, icon: Users },
  { label: "Alumni", route: "alumni" as Route, icon: GraduationCap },
  { label: "Recruitment", route: "recruitment" as Route, icon: UserPlus },
];

function routeFromHash(): Route {
  const value = window.location.hash.replace("#/", "").toLowerCase();
  return value in routes ? (value as Route) : "home";
}

function navigate(route: Route) {
  window.location.hash = `/${route}`;
}

function ScaledDesign({
  children,
  sourceHeight,
  currentRoute,
  onNavigate,
}: {
  children: React.ReactNode;
  sourceHeight: number;
  currentRoute: Route;
  onNavigate: (route: Route) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Scaling & Zoom state
  const [baseScale, setBaseScale] = useState(1);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [panX, setPanX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState(sourceHeight);

  // Gesture tracking refs
  const lastTapTime = useRef<number>(0);
  const lastTapPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<number>(0);
  const pinchStartDistRef = useRef<number>(0);
  const pinchStartZoomRef = useRef<number>(1);

  // Measure and baseScale calculation
  useEffect(() => {
    const update = () => {
      const clientWidth = host.current?.clientWidth || window.innerWidth || 1728;
      const bScale = Math.min(1, clientWidth / 1728);
      setBaseScale(bScale);
      setIsMobile(clientWidth < 1024);

      if (canvasRef.current) {
        const pageEl = canvasRef.current.firstElementChild as HTMLElement | null;
        let actualH = 0;
        if (pageEl) {
          const children = pageEl.children;
          for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;
            const bottom = child.offsetTop + child.offsetHeight;
            if (bottom > actualH) actualH = bottom;
          }
          actualH = Math.max(actualH, pageEl.scrollHeight, pageEl.offsetHeight);
        }
        if (!actualH) {
          actualH = canvasRef.current.scrollHeight;
        }
        setMeasuredHeight(actualH || sourceHeight);
      }
    };

    update();
    const timer = setTimeout(update, 150);
    const observer = new ResizeObserver(update);
    if (host.current) observer.observe(host.current);
    if (canvasRef.current) observer.observe(canvasRef.current);
    window.addEventListener("resize", update);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [children, sourceHeight]);

  const clientWidth = host.current?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1728);
  const effectiveScale = baseScale * zoomFactor;
  const defaultPanX = Math.max(0, (clientWidth - 1728 * effectiveScale) / 2);

  // Synchronize panX when zoom is at 1.0 (Fit)
  useEffect(() => {
    if (zoomFactor === 1) {
      setPanX(defaultPanX);
    }
  }, [zoomFactor, defaultPanX]);

  // Touch Handlers for mobile gestures: Double-Tap, Pinch-to-zoom, Pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const now = Date.now();
      const prevTime = lastTapTime.current;
      const prevPos = lastTapPos.current;
      const dist = Math.hypot(touch.clientX - prevPos.x, touch.clientY - prevPos.y);

      // Check for double tap
      if (now - prevTime < 320 && dist < 35) {
        setIsTransitioning(true);
        if (zoomFactor > 1.05) {
          // Reset to fit
          setZoomFactor(1);
          setPanX(defaultPanX);
        } else {
          // Zoom in to comfortable reading size
          const targetZoom = Math.min(2.8, Math.max(1.8, 1 / baseScale));
          const targetScale = baseScale * targetZoom;
          const minX = clientWidth - 1728 * targetScale;
          const tapX = touch.clientX;
          const targetPanX = Math.max(minX, Math.min(0, tapX - (tapX - panX) * targetZoom));
          setZoomFactor(targetZoom);
          setPanX(targetPanX);
        }
        setTimeout(() => setIsTransitioning(false), 300);
        lastTapTime.current = 0;
        return;
      }

      lastTapTime.current = now;
      lastTapPos.current = { x: touch.clientX, y: touch.clientY };
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      panStartRef.current = panX;
    } else if (e.touches.length === 2) {
      // Pinch to zoom start
      pinchStartDistRef.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStartZoomRef.current = zoomFactor;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistRef.current > 0) {
      // Pinch zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / pinchStartDistRef.current;
      const newZoom = Math.max(1, Math.min(3.2, pinchStartZoomRef.current * ratio));
      setIsTransitioning(false);
      setZoomFactor(newZoom);
      if (newZoom <= 1.02) {
        setPanX(defaultPanX);
      } else {
        const newScale = baseScale * newZoom;
        const minX = clientWidth - 1728 * newScale;
        setPanX((prev) => Math.max(minX, Math.min(0, prev)));
      }
    } else if (e.touches.length === 1 && zoomFactor > 1.05) {
      // Panning when zoomed in
      const deltaX = e.touches[0].clientX - touchStartRef.current.x;
      const deltaY = e.touches[0].clientY - touchStartRef.current.y;
      if (Math.abs(deltaX) > Math.abs(deltaY) * 0.7) {
        const newPanX = panStartRef.current + deltaX;
        const minX = clientWidth - 1728 * effectiveScale;
        setPanX(Math.max(minX, Math.min(0, newPanX)));
      }
    }
  };

  const handleTouchEnd = () => {
    pinchStartDistRef.current = 0;
  };

  // Button Zoom Actions
  const handleZoomIn = () => {
    setIsTransitioning(true);
    setZoomFactor((prev) => {
      const next = Math.min(3.0, prev + 0.4);
      const newScale = baseScale * next;
      const minX = clientWidth - 1728 * newScale;
      setPanX((p) => Math.max(minX, Math.min(0, p)));
      return next;
    });
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleZoomOut = () => {
    setIsTransitioning(true);
    setZoomFactor((prev) => {
      const next = Math.max(1.0, prev - 0.4);
      if (next <= 1.05) {
        setPanX(defaultPanX);
        return 1.0;
      }
      const newScale = baseScale * next;
      const minX = clientWidth - 1728 * newScale;
      setPanX((p) => Math.max(minX, Math.min(0, p)));
      return next;
    });
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleResetZoom = () => {
    setIsTransitioning(true);
    setZoomFactor(1);
    setPanX(defaultPanX);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const currentPan = zoomFactor === 1 ? defaultPanX : panX;

  return (
    <>
      <div
        ref={host}
        className="design-viewport"
        style={{ height: measuredHeight * effectiveScale }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(event) => {
          const target = event.target as HTMLElement;
          const logo = target.closest('[data-name="NCS Logo"]');
          if (logo) {
            onNavigate("home");
            return;
          }
          const label = target.textContent?.trim().toLowerCase();
          if (label && label in routes) {
            onNavigate(label as Route);
          }
          if (label === "connect" || label === "let’s connect" || label === "let's connect") {
            document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <div
          ref={canvasRef}
          className="design-canvas"
          style={{
            transform: `translate3d(${currentPan}px, 0, 0) scale(${effectiveScale})`,
            transition: isTransitioning ? "transform 0.28s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          }}
        >
          {children}
        </div>
      </div>

      {/* Mobile-first Floating Zoom & Quick-Nav Dock */}
      {isMobile && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-auto">
          {/* Zoom & Menu Bar */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-white">
            {/* Quick Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer text-xs font-semibold text-white active:scale-95"
              aria-label="Navigation Menu"
            >
              <Menu size={16} strokeWidth={2.4} />
              <span>Menu</span>
            </button>

            <div className="w-[1px] h-4 bg-white/20 my-auto" />

            {/* Zoom Out Button */}
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomFactor <= 1.05}
              className="p-2 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-white active:scale-90"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut size={16} strokeWidth={2.2} />
            </button>

            {/* Zoom Level Indicator / Fit Reset */}
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-[11px] font-mono tracking-tight transition-all cursor-pointer text-neutral-300 hover:text-white active:scale-95 flex items-center gap-1"
              title="Fit to Screen"
            >
              <Maximize size={12} strokeWidth={2.2} />
              <span>{zoomFactor <= 1.05 ? "Fit" : `${Math.round(zoomFactor * 100)}%`}</span>
            </button>

            {/* Zoom In Button */}
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomFactor >= 2.9}
              className="p-2 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-white active:scale-90"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Slide-Up Quick Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Drawer Body */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-neutral-950/95 border border-white/15 p-6 shadow-2xl text-white overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/e1de9.svg"
                    alt="NCS Logo"
                    className="h-8 w-auto object-contain"
                  />
                  <div>
                    <h3 className="font-['Satoshi:Bold',Arial,sans-serif] text-base font-bold tracking-tight text-white leading-tight">
                      NCS
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-medium leading-none">
                      Nibble Computer Society
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer text-neutral-300 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2 py-5 overflow-y-auto">
                {navItemsList.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.route;

                  return (
                    <button
                      key={item.route}
                      type="button"
                      onClick={() => {
                        onNavigate(item.route);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all cursor-pointer text-left select-none ${
                        isActive
                          ? "bg-white text-black font-bold shadow-lg"
                          : "text-neutral-300 hover:text-white hover:bg-white/10 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon size={20} className={isActive ? "text-black" : "text-neutral-400"} />
                        <span className="text-[17px] font-['Satoshi',Arial,sans-serif]">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className={isActive ? "text-black" : "text-neutral-500"}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Actions & Tip */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-neutral-200 via-white to-neutral-300 text-black font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Connect with Us</span>
                  <span>↗</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1 text-center">
                  <Hand size={14} className="text-neutral-500 shrink-0" />
                  <span>Double-tap or pinch anywhere to zoom in/out</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(routeFromHash());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const page = useMemo(() => routes[route], [route]);
  const Page = page.component;

  return (
    <WebsiteLoader>
      <main className="relative min-h-dvh bg-black">
        {/* 3D Ethereal Beams Background across whole website */}
        <EtherealBeamsBackground
          beamWidth={2.5}
          beamHeight={18}
          speed={2.5}
          noiseIntensity={2}
          lightColor="#ffffff"
          rotation={43}
        />
        <div className="relative z-10">
          <ScaledDesign
            sourceHeight={page.height}
            currentRoute={route}
            onNavigate={(r) => navigate(r)}
          >
            <Page />
          </ScaledDesign>
        </div>
      </main>
    </WebsiteLoader>
  );
}

