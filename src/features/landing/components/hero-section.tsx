"use client";

import { useLanguage } from "@/features/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { portfolioConfig } from "@/shared/lib/config/portfolio";
import Image from "next/image";
import { ScrollDown } from "./scroll-down";

const HeroSection = () => {
  const { locale } = useLanguage();
  const isRtl = locale === "ar";

  return (
    <div className={`mx-auto max-w-7xl px-4 py-12 ${isRtl ? "text-right" : "text-left"}`}>
      {/* Hero Card */}
      <Card className="mb-8 transition-shadow hover:shadow-lg h-[calc(100vh-8rem)] flex items-center relative">
        <CardContent className="py-8 w-full">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Image
                src="/avatar.jpg"
                alt="Shiro 0x29a"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            
            {/* Text Content */}
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

      {/* Skills Section */}
      <div id="skills" className="mb-6 mt-16 h-screen relative">
        <h2 className="pt-8 mb-6 text-3xl font-bold text-center">My Skills</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pb-20">
          {portfolioConfig.skills.map((skill, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{skill.icon}</span>
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {skill.description}
                </p>
              </CardContent>
            </Card>
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
