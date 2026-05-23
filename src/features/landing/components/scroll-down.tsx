"use client";

import { ChevronDown } from "lucide-react";

export function ScrollDown() {
  const handleScroll = () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
