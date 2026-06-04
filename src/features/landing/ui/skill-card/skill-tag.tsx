import * as React from "react";

interface SkillTagProps {
  children: React.ReactNode;
}

export function SkillTag({ children }: SkillTagProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.7)] cursor-default">
      {children}
    </span>
  );
}
