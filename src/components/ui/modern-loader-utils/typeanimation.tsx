import React, { useEffect, useState } from "react";

interface TypeAnimationProps {
  words: string[];
  typingSpeed?: "slow" | "medium" | "fast" | number;
  deletingSpeed?: "slow" | "medium" | "fast" | number;
  pauseDuration?: number;
  className?: string;
}

export default function TypeAnimation({
  words = ["NCS WORLD LOADING..."],
  typingSpeed = "slow",
  deletingSpeed = "slow",
  pauseDuration = 2000,
  className = "",
}: TypeAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const getSpeedMs = (speed: "slow" | "medium" | "fast" | number, isDel: boolean) => {
    if (typeof speed === "number") return speed;
    if (isDel) {
      return speed === "slow" ? 60 : speed === "fast" ? 25 : 40;
    }
    return speed === "slow" ? 95 : speed === "fast" ? 45 : 70;
  };

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[currentWordIndex % words.length];

    if (!isDeleting && displayedText === currentWord) {
      if (words.length === 1) return;
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const speed = getSpeedMs(isDeleting ? deletingSpeed : typingSpeed, isDeleting);

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-1.5 h-3 ml-0.5 bg-blue-400 animate-pulse align-middle" />
    </span>
  );
}
