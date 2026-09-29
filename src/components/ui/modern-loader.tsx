"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import TypeAnimation from "@/components/ui/modern-loader-utils/typeanimation";

export interface ModernLoaderProps {
  words?: string[];
  className?: string;
  onFinish?: () => void;
  autoDismissMs?: number;
}

const ModernLoader: React.FC<ModernLoaderProps> = ({
  words = [
    "NCS WORLD LOADING...",
    "INITIALIZING MODULES...",
    "ALMOST READY...",
  ],
  className,
  onFinish,
  autoDismissMs,
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = useMemo(
    () => [
      "bg-gray-500",
      "bg-teal-500",
      "bg-blue-500",
      "bg-gray-600",
      "bg-pink-500",
    ],
    [],
  );
  const BUFFER = 20;
  const MAX_LINES = 100;

  const generateLines = useCallback(
    (count = 20) =>
      Array.from({ length: count }, (_, idx) => ({
        id: Date.now() + idx + Math.random(),
        segments: Array.from(
          { length: Math.floor(Math.random() * 4) + 1 },
          () => ({
            width: `${Math.floor(Math.random() * 80) + 50}px`,
            color: colors[Math.floor(Math.random() * colors.length)],
            isCircle: Math.random() > 0.93,
            indent: Math.random() > 0.7 ? 1 : 0,
          }),
        ),
      })),
    [colors],
  );

  const [lines, setLines] = useState(() => generateLines());

  const getVisibleRange = () => {
    const start = Math.max(0, currentLine - BUFFER);
    const end = Math.min(lines.length, currentLine + BUFFER);
    return { start, end };
  };

  const { start: visibleStart, end: visibleEnd } = getVisibleRange();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentLine]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLine((prev) => {
        const nextLine = prev + 1;
        if (nextLine >= lines.length - 10)
          setLines((old) => [...old, ...generateLines(50)]);
        return nextLine;
      });
    }, 180);
    return () => clearTimeout(timer);
  }, [currentLine, lines.length, generateLines]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = () => {
      if (lines.length > MAX_LINES && currentLine > BUFFER * 2) {
        setLines((oldLines) => {
          const safeIndex = currentLine - BUFFER * 2;
          if (safeIndex > 0) {
            setCurrentLine((prev) => prev - safeIndex);
            return oldLines.slice(safeIndex);
          }
          return oldLines;
        });
      }
    };
    const interval = setInterval(cleanup, 5000);
    return () => clearInterval(interval);
  }, [currentLine, lines.length]);

  useEffect(() => {
    if (!autoDismissMs || !onFinish) return;
    const timer = setTimeout(() => {
      onFinish();
    }, autoDismissMs);
    return () => clearTimeout(timer);
  }, [autoDismissMs, onFinish]);

  const visibleLines = lines.slice(visibleStart, visibleEnd);

  return (
    <div className={cn("w-full max-w-md mx-auto p-4 sm:p-8 select-none", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#0b0d14] h-[300px] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden border border-white/15"
      >
        {/* Window Header */}
        <div className="px-4 py-3 flex items-center z-10 relative border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <motion.div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <motion.div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            <motion.div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 text-center pr-8"
          >
            <TypeAnimation
              words={words}
              typingSpeed="slow"
              deletingSpeed="slow"
              pauseDuration={2000}
              className="text-neutral-300 text-xs font-mono font-semibold tracking-wider"
            />
          </motion.div>
        </div>

        {/* Terminal Content */}
        <div
          ref={containerRef}
          className="relative px-5 py-4 font-mono text-sm overflow-y-hidden h-[calc(100%-48px)] bg-black/40"
        >
          <div className="space-y-2 relative z-10">
            <AnimatePresence mode="sync">
              {visibleLines.map((line, idx) => {
                const actualIndex = visibleStart + idx;
                if (actualIndex >= currentLine) return null;
                const extraMargin = (idx + 1) % 4 === 0 ? "mt-2" : "";
                const paddingClass = line.segments[0]?.indent ? "pl-4" : "";
                return (
                  <React.Fragment key={line.id}>
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 h-5",
                        extraMargin,
                        paddingClass,
                      )}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {line.segments.map((seg, i) =>
                        seg.isCircle ? (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.05 }}
                            className={cn(
                              "w-3.5 h-3.5 rounded-full opacity-60",
                              seg.color,
                            )}
                          />
                        ) : (
                          <motion.div
                            key={i}
                            initial={{ width: 0 }}
                            animate={{ width: seg.width }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className={cn(
                              "h-2.5 rounded-sm opacity-60",
                              seg.color,
                            )}
                            style={{ width: seg.width }}
                          />
                        ),
                      )}
                    </motion.div>

                    {(actualIndex + 1) % 6 === 0 && (
                      <motion.div
                        className="w-full h-[1px] bg-white/10 rounded-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </AnimatePresence>

            {currentLine < lines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center h-5"
                style={{
                  paddingLeft: `${
                    lines[currentLine]?.segments[0]?.indent ? 16 : 0
                  }px`,
                }}
              >
                <motion.div
                  animate={{ opacity: cursorVisible ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  className="w-1.5 h-3.5 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernLoader;
