"use client";

import { useState } from "react";
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

export interface NavItemConfig {
  label: string;
  icon: LucideIcon;
  route?: string;
}

export const defaultNavItems: NavItemConfig[] = [
  { label: "Home", icon: Home, route: "home" },
  { label: "About", icon: Info, route: "about" },
  { label: "Project", icon: FolderGit2, route: "project" },
  { label: "Team", icon: Users, route: "team" },
  { label: "Alumni", icon: GraduationCap, route: "alumni" },
  { label: "Recruitment", icon: UserPlus, route: "recruitment" },
];

export type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyBottom?: boolean;
  items?: NavItemConfig[];
  onSelect?: (index: number, route?: string) => void;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyBottom = false,
  items = defaultNavItems,
  onSelect,
}: BottomNavBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Navigation Bar"
      className={cn(
        "bg-white/90 backdrop-blur-xl border border-black/10 rounded-full flex items-center p-2 shadow-xl space-x-1 min-w-[320px] max-w-[95vw] h-[52px]",
        stickyBottom && "fixed inset-x-0 bottom-4 mx-auto z-20 w-fit",
        className,
      )}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const isSelected = activeIndex === idx;
        const isHovered = hoveredIndex === idx;
        const isExpanded = isSelected || isHovered;

        return (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] min-h-[40px] max-h-[44px] cursor-pointer",
              isSelected
                ? "bg-black text-white gap-2 shadow-sm"
                : "bg-transparent text-black/70 hover:bg-black/5 hover:text-black",
              "focus:outline-none focus-visible:ring-0",
            )}
            onClick={() => {
              setActiveIndex(idx);
              onSelect?.(idx, item.route);
            }}
            aria-label={item.label}
            type="button"
          >
            <Icon
              size={20}
              strokeWidth={2}
              aria-hidden
              className="shrink-0 transition-colors duration-200"
            />

            <motion.div
              initial={false}
              animate={{
                width: isExpanded ? "auto" : "0px",
                opacity: isExpanded ? 1 : 0,
                marginLeft: isExpanded ? "8px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className="overflow-hidden flex items-center"
            >
              <span
                className={cn(
                  "font-medium text-sm whitespace-nowrap select-none transition-opacity duration-200",
                  isSelected ? "text-white" : "text-black",
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

export default BottomNavBar;

export function Demo() {
  return <BottomNavBar />;
}
