import * as React from "react";
import { cn } from "@/shared/lib/utils";
import styles from "./skill-card.module.css";

interface SkillCardProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

function SkillCard({ className, children, ...props }: SkillCardProps) {
  return (
    <div
      className={cn(styles.card, "bg-card text-card-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function SkillCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(styles.header, className)}
      {...props}
    />
  );
}

function SkillCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(styles.title, className)}
      {...props}
    />
  );
}

function SkillCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.content, className)} {...props} />;
}

export { SkillCard, SkillCardHeader, SkillCardTitle, SkillCardContent };
