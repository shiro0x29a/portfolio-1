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
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
      <button
        onClick={handleScroll}
        className="text-primary hover:translate-y-2 transition-transform duration-300 cursor-pointer"
        aria-label="Scroll to skills section"
      >
        <ChevronDown className="w-10 h-10" />
      </button>
    </div>
  );
}
