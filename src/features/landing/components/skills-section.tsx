"use client";

import { SkillCard, SkillCardHeader, SkillCardTitle, SkillCardContent } from "./skill-card";
import { portfolioConfig } from "@/shared/lib/config/portfolio";
import { ScrollDown } from "./scroll-down";

const SkillsSection = () => {
  return (
    <div id="skills" className="mb-6 mt-16 h-screen relative">
      <div className="text-center">
        <p className="mb-3.5 text-[0.78rem] font-normal text-muted-foreground tracking-[0.25em] uppercase flex items-center justify-center gap-2.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <span className="w-8 h-[1px] bg-muted-foreground"></span>
          What I Work With
        </p>
        <h2 className="inline-block font-extrabold leading-[1.1] mb-5 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>My Tech Stack</h2>
        <p className="text-muted-foreground mb-6 leading-[1.7] mx-auto" style={{ maxWidth: '520px' }}>A collection of tools and technologies I've mastered to build end-to-end solutions.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pb-20">
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
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
        <ScrollDown targetId="projects" />
      </div>
    </div>
  );
};

export default SkillsSection;
