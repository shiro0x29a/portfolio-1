"use client";

import { ChevronDown } from "lucide-react";

interface ScrollDownProps {
  targetId?: string;
}

export function ScrollDown({ targetId = "skills" }: ScrollDownProps) {
  const handleScroll = () => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const offset = 80; // offset in pixels
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    // <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
    // <div className="hidden md:flex md:absolute md:bottom-2 md:left-1/2 md:-translate-x-1/2">
    // <div className="absolute bottom-1/2 right-4 -translate-y-1/2 z-10 md:bottom-2 md:left-1/2 md:right-auto md:translate-y-0 md:-translate-x-1/2">
    // for laptop l
    // <div className="absolute bottom-1/2 left-4 -translate-y-1/2 z-10 md:bottom-2 md:left-1/2 md:translate-y-4 md:-translate-x-1/2">
    <div className="absolute bottom-1/2 left-4 -translate-y-1/2 z-10 md:bottom-2 md:left-1/2 md:translate-y-4 md:-translate-x-1/2">
      <button
        onClick={handleScroll}
        className="group text-primary hover:translate-y-4 transition-transform duration-600 cursor-pointer"
        aria-label="Scroll to skills section"
      >
      <ChevronDown className="w-10 h-10 animate-bounce group-hover:[animation-play-state:paused]"/>
      </button>
    </div>
  );
}
