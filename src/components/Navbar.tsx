import React from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

interface NavItem {
  label: string;
  route: string;
  gradient: string;
  accentColor: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    route: "home",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(37,99,235,0.12) 50%, transparent 100%)",
    accentColor: "#2563eb",
  },
  {
    label: "About",
    route: "about",
    gradient: "radial-gradient(circle, rgba(249,115,22,0.35) 0%, rgba(234,88,12,0.12) 50%, transparent 100%)",
    accentColor: "#ea580c",
  },
  {
    label: "Project",
    route: "project",
    gradient: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(147,51,234,0.12) 50%, transparent 100%)",
    accentColor: "#9333ea",
  },
  {
    label: "Team",
    route: "team",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.35) 0%, rgba(22,163,74,0.12) 50%, transparent 100%)",
    accentColor: "#16a34a",
  },
  {
    label: "Alumni",
    route: "alumni",
    gradient: "radial-gradient(circle, rgba(236,72,153,0.35) 0%, rgba(219,39,119,0.12) 50%, transparent 100%)",
    accentColor: "#db2777",
  },
  {
    label: "Recruitment",
    route: "recruitment",
    gradient: "radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(2,132,199,0.12) 50%, transparent 100%)",
    accentColor: "#0284c7",
  },
];

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.45, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.7,
};

export function Navbar({ currentRoute = "home", onNavigate }: NavbarProps) {
  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.hash = `/${route}`;
    }
  };

  const handleConnect = () => {
    document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="relative mx-auto h-[106px] w-[1539px] max-w-full rounded-[53px] bg-white shadow-xl overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      {/* Dynamic Ambient Nav Glow on Hover */}
      <motion.div
        className="absolute -inset-2 rounded-[55px] pointer-events-none z-0"
        variants={navGlowVariants}
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.18) 0%, rgba(168,85,247,0.14) 35%, rgba(236,72,153,0.12) 65%, transparent 100%)",
        }}
      />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[120px] z-10">
        {/* NCS Logo */}
        <motion.button
          type="button"
          onClick={() => handleNav("home")}
          className="relative h-[54.39px] w-[122.96px] shrink-0 cursor-pointer"
          data-name="NCS Logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src="/assets/e1de9.svg"
            className="block size-full max-w-none object-contain"
            alt="Nibble Computer Society"
          />
        </motion.button>

        {/* 3D Flip Nav Links */}
        <div className="flex items-center gap-[60px] font-['Satoshi',Arial,sans-serif] text-[29.1px] tracking-[0.11px]">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <motion.div
                key={item.route}
                className="relative cursor-pointer select-none group"
                style={{ perspective: "600px" }}
                initial="initial"
                whileHover="hover"
                onClick={() => handleNav(item.route)}
              >
                {/* Radial Glow underneath */}
                <motion.div
                  className="absolute inset-0 -m-3 pointer-events-none rounded-2xl z-0"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                  }}
                />

                {/* Front Face (Default text) */}
                <motion.div
                  className={`relative z-10 px-1 py-0.5 whitespace-nowrap font-normal transition-colors duration-200 ${
                    isActive ? "font-bold text-black" : "text-black"
                  }`}
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom",
                    fontSize: "29.1px",
                    fontFamily: "'Satoshi', Arial, sans-serif",
                    lineHeight: 1.2,
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>

                {/* Back Face (3D Flipped Text with Accent Color) */}
                <motion.div
                  className="absolute inset-0 z-10 px-1 py-0.5 whitespace-nowrap font-semibold flex items-center justify-center"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    rotateX: 90,
                    fontSize: "29.1px",
                    fontFamily: "'Satoshi', Arial, sans-serif",
                    lineHeight: 1.2,
                    color: item.accentColor,
                  }}
                >
                  <span>{item.label}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* 3D Flip Connect Button */}
        <motion.button
          type="button"
          onClick={handleConnect}
          className="relative flex h-[66px] px-[38px] shrink-0 cursor-pointer items-center justify-center rounded-[33px] bg-black text-center font-normal tracking-[0.11px] text-[#fffefe] overflow-hidden group shadow-md"
          style={{
            fontFamily: "'Satoshi', Arial, sans-serif",
            fontSize: "29.1px",
            perspective: "600px",
          }}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          {/* Subtle button sheen */}
          <motion.div
            className="absolute -inset-1 rounded-[33px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
            }}
          />

          {/* Front Face */}
          <motion.span
            className="relative z-10 whitespace-nowrap select-none"
            variants={itemVariants}
            transition={sharedTransition}
            style={{
              fontSize: "29.1px",
              fontFamily: "'Satoshi', Arial, sans-serif",
              lineHeight: 1,
              transformStyle: "preserve-3d",
              transformOrigin: "center bottom",
            }}
          >
            Connect
          </motion.span>

          {/* Back Face */}
          <motion.span
            className="absolute inset-0 z-10 flex items-center justify-center whitespace-nowrap select-none font-semibold text-white"
            variants={backVariants}
            transition={sharedTransition}
            style={{
              fontSize: "29.1px",
              fontFamily: "'Satoshi', Arial, sans-serif",
              lineHeight: 1,
              transformStyle: "preserve-3d",
              transformOrigin: "center top",
              rotateX: 90,
            }}
          >
            Connect ↗
          </motion.span>
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default Navbar;

