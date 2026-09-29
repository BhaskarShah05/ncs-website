import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernLoader from "@/components/ui/modern-loader";

interface WebsiteLoaderProps {
  children: React.ReactNode;
  duration?: number;
}

export default function WebsiteLoader({
  children,
  duration = 2400,
}: WebsiteLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="ncs-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#05070D] cursor-pointer"
            onClick={() => setIsLoading(false)}
          >
            {/* Ambient background glow */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center">
              <ModernLoader
                words={[
                  "NCS WORLD LOADING...",
                  "INITIALIZING MODULES...",
                  "WELCOME TO NCS...",
                ]}
              />

              {/* Subtle tap/click to enter hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1 }}
                className="mt-4 text-xs font-mono text-neutral-400 tracking-wider hover:text-white transition-colors"
              >
                Click anywhere to skip
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full">{children}</div>
    </>
  );
}
