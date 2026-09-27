import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Info,
  FolderGit2,
  Users,
  GraduationCap,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

interface NavItem {
  label: string;
  route: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Home", route: "home", icon: Home },
  { label: "About", route: "about", icon: Info },
  { label: "Project", route: "project", icon: FolderGit2 },
  { label: "Team", route: "team", icon: Users },
  { label: "Alumni", route: "alumni", icon: GraduationCap },
  { label: "Recruitment", route: "recruitment", icon: UserPlus },
];

export function Navbar({ currentRoute = "home", onNavigate }: NavbarProps) {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

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
    <nav className="relative mx-auto h-[106px] w-[1539px] max-w-full rounded-[53px] bg-white shadow-xl px-[40px] flex items-center justify-between">
      {/* 1. Left: NCS Logo (Untouched) */}
      <button
        type="button"
        onClick={() => handleNav("home")}
        className="relative h-[54.39px] w-[122.96px] shrink-0 cursor-pointer transition-transform hover:scale-105"
        data-name="NCS Logo"
      >
        <img
          src="/assets/e1de9.svg"
          className="block size-full max-w-none object-contain"
          alt="Nibble Computer Society"
        />
      </button>

      {/* 2. Center: Extended & Perfectly Spaced Navigation Pill */}
      <div className="flex items-center h-[68px] px-3 rounded-[34px] bg-neutral-100/90 border border-black/5 shadow-inner gap-2 xl:gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;

          return (
            <motion.button
              key={item.route}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => setHoveredRoute(item.route)}
              onMouseLeave={() => setHoveredRoute(null)}
              onClick={() => handleNav(item.route)}
              className={cn(
                "relative flex items-center justify-center gap-2.5 h-[52px] px-5 rounded-full cursor-pointer transition-colors duration-200 focus:outline-none select-none",
                isActive
                  ? "text-white"
                  : "text-neutral-700 hover:text-black hover:bg-white/80",
              )}
              aria-label={item.label}
              type="button"
            >
              {/* Active Sliding Pill Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-full bg-black shadow-md z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              <Icon
                size={22}
                strokeWidth={2.2}
                aria-hidden
                className={cn(
                  "relative z-10 shrink-0 transition-colors duration-200",
                  isActive ? "text-white" : "text-neutral-800",
                )}
              />

              {/* Label */}
              <span
                className={cn(
                  "relative z-10 whitespace-nowrap text-[20px] tracking-[0.1px] transition-colors duration-200 leading-none",
                  isActive ? "font-semibold text-white" : "font-medium text-neutral-800",
                )}
                style={{ fontFamily: "'Satoshi', Arial, sans-serif" }}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* 3. Right: Connect CTA (Untouched) */}
      <button
        type="button"
        onClick={handleConnect}
        className="flex h-[66px] px-[38px] shrink-0 cursor-pointer items-center justify-center rounded-[33px] bg-black text-center font-normal tracking-[0.11px] text-[#fffefe] transition-all hover:bg-neutral-800"
        style={{ fontFamily: "'Satoshi', Arial, sans-serif", fontSize: "29.1px" }}
      >
        <span style={{ fontSize: "29.1px", fontFamily: "'Satoshi', Arial, sans-serif", lineHeight: 1 }}>
          Connect
        </span>
      </button>
    </nav>
  );
}

export default Navbar;


