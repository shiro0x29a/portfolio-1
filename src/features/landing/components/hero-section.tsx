"use client";

import { useLanguage } from "@/features/i18n";
import { Card, CardContent } from "@/shared/ui/card";
import { portfolioConfig } from "@/shared/lib/config/portfolio";
import Image from "next/image";
import { ScrollDown } from "./scroll-down";
import SkillsSection from "./skills-section";

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

      <SkillsSection />
    </div>
  );
};

export default HeroSection;
