import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface SkillCardProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

function SkillCard({ className, children, ...props }: SkillCardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.6)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SkillCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6",
        className
      )}
      {...props}
    />
  );
}

function SkillCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("leading-none font-semibold", className)}
      style={{ fontFamily: 'Syne, sans-serif' }}
      {...props}
    />
  );
}

function SkillCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6", className)} {...props} />;
}

export { SkillCard, SkillCardHeader, SkillCardTitle, SkillCardContent };
