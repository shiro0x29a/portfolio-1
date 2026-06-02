"use client";

import { useLanguage } from "@/features/i18n";
import { Card, CardContent } from "@/shared/ui/card";
import { SkillCard, SkillCardHeader, SkillCardTitle, SkillCardContent } from "./skill-card";
import { portfolioConfig } from "@/shared/lib/config/portfolio";
import Image from "next/image";
import { ScrollDown } from "./scroll-down";

const HeroSection = () => {
  const { locale } = useLanguage();
  const isRtl = locale === "ar";

  return (
    <div className={`mx-auto max-w-7xl px-4 py-12 ${isRtl ? "text-right" : "text-left"}`}>
      <Card className="mb-8 transition-shadow hover:shadow-lg h-[calc(100vh-8rem)] flex items-center relative">
        <CardContent className="py-8 w-full">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="flex-shrink-0">
              <Image
                src="/avatar.jpg"
                alt="Shiro 0x29a"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-muted-foreground mb-4 text-2xl">
                  {portfolioConfig.personal.greeting}
                </p>
                <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-7xl font-bold text-transparent">
                  {portfolioConfig.personal.name}
                </h1>
                <h2 className="text-foreground mt-4 text-4xl font-semibold">
                  {portfolioConfig.personal.title}
                </h2>
              </div>
              <p className="text-muted-foreground text-2xl leading-relaxed">
                {portfolioConfig.personal.description}
              </p>
            </div>
          </div>
        </CardContent>
        <ScrollDown />
      </Card>

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
    </div>
  );
};

export default HeroSection;
