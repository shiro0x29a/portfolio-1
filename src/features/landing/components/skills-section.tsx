"use client";

import { SkillCard, SkillCardHeader, SkillCardTitle, SkillCardContent } from "./skill-card";
import { portfolioConfig } from "@/shared/lib/config/portfolio";
import { ScrollDown } from "./scroll-down";
import styles from "./styles/skills-section.module.css";

const SkillsSection = () => {
  return (
    <div id="skills" className={styles.section}>
      <div className={styles.header}>
        <p className={`text-muted-foreground ${styles.label}`}>
          <span className="bg-muted-foreground w-8 h-[1px]"></span>
          What I Work With
        </p>
        <h2 className={styles.title}>My Tech Stack</h2>
        <p className={`text-muted-foreground ${styles.description}`}>A collection of tools and technologies I've mastered to build end-to-end solutions.</p>
      </div>
      <div className={styles.grid}>
        {portfolioConfig.skills.map((skill, index) => (
          <SkillCard key={index}>
            <SkillCardHeader>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{skill.icon}</span>
                <SkillCardTitle className="text-lg">{skill.title}</SkillCardTitle>
              </div>
            </SkillCardHeader>
            <SkillCardContent>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.7)] cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SkillCardContent>
          </SkillCard>
        ))}
      </div>
      <div className={styles.scrollDownWrapper}>
        <ScrollDown targetId="projects" />
      </div>
    </div>
  );
};

export default SkillsSection;
