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

      {/* 2. Center: Expandable Icon Nav Links */}
      <div className="flex items-center p-2 rounded-full bg-neutral-100/90 border border-black/5 shadow-inner gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;
          const isHovered = hoveredRoute === item.route;
          const isExpanded = isActive || isHovered;

          return (
            <motion.button
              key={item.route}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => setHoveredRoute(item.route)}
              onMouseLeave={() => setHoveredRoute(null)}
              onClick={() => handleNav(item.route)}
              className={cn(
                "flex items-center rounded-full transition-all duration-200 relative h-[56px] min-w-[56px] px-4 cursor-pointer focus:outline-none",
                isActive
                  ? "bg-black text-white shadow-md gap-2.5"
                  : "bg-transparent text-black/70 hover:bg-white hover:text-black hover:shadow-sm",
              )}
              aria-label={item.label}
              type="button"
            >
              <Icon
                size={24}
                strokeWidth={2.2}
                aria-hidden
                className={cn(
                  "shrink-0 transition-colors duration-200",
                  isActive ? "text-white" : "text-black/80",
                )}
              />

              <motion.div
                initial={false}
                animate={{
                  width: isExpanded ? "auto" : "0px",
                  opacity: isExpanded ? 1 : 0,
                  marginLeft: isExpanded ? "8px" : "0px",
                }}
                transition={{
                  width: { type: "spring", stiffness: 350, damping: 30 },
                  opacity: { duration: 0.18 },
                  marginLeft: { duration: 0.18 },
                }}
                className="overflow-hidden flex items-center"
              >
                <span
                  className={cn(
                    "whitespace-nowrap select-none text-[22px] tracking-[0.11px]",
                    isActive ? "font-bold text-white" : "font-medium text-black",
                  )}
                  style={{ fontFamily: "'Satoshi', Arial, sans-serif" }}
                >
                  {item.label}
                </span>
              </motion.div>
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


