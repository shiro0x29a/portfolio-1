import * as React from "react";
import styles from "./skill-tag.module.css";

interface SkillTagProps {
  children: React.ReactNode;
}

export function SkillTag({ children }: SkillTagProps) {
  return (
    <span className={styles.tag}>
      {children}
    </span>
  );
}
