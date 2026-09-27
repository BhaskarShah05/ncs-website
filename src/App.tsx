import { useEffect, useMemo, useRef, useState } from "react";
import About from "./pages/About";
import Alumni from "./pages/Alumni";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Recruitment from "./pages/Recruitment";
import Team from "./pages/Team";
import { EtherealBeamsBackground } from "./components/ui/ethereal-beams-hero";

type Route = "home" | "about" | "project" | "team" | "alumni" | "recruitment";

const routes: Record<Route, { component: () => React.JSX.Element; height: number }> = {
  home: { component: Home, height: 4200 },
  about: { component: About, height: 3500 },
  project: { component: Project, height: 2600 },
  team: { component: Team, height: 7500 },
  alumni: { component: Alumni, height: 11000 },
  recruitment: { component: Recruitment, height: 2100 },
};

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
}: {
  children: React.ReactNode;
  sourceHeight: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [measuredHeight, setMeasuredHeight] = useState(sourceHeight);

  useEffect(() => {
    const update = () => {
      const clientWidth = host.current?.clientWidth ?? 1728;
      const currentScale = clientWidth / 1728;
      setScale(currentScale);

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
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [children, sourceHeight]);

  return (
    <div
      ref={host}
      className="design-viewport"
      style={{ height: measuredHeight * scale }}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        const logo = target.closest('[data-name="NCS Logo"]');
        if (logo) {
          navigate("home");
          return;
        }
        const label = target.textContent?.trim().toLowerCase();
        if (label && label in routes) {
          navigate(label as Route);
        }
        if (label === "connect" || label === "let’s connect" || label === "let's connect") {
          document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <div
        ref={canvasRef}
        className="design-canvas"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
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
        <ScaledDesign sourceHeight={page.height}>
          <Page />
        </ScaledDesign>
      </div>
    </main>
  );
}
