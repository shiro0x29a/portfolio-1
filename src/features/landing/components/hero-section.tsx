"use client";

import { useLanguage } from "@/features/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { portfolioConfig } from "@/shared/lib/config/portfolio";

const HeroSection = () => {
  const { locale } = useLanguage();
  const isRtl = locale === "ar";

  return (
    <div className={`mx-auto max-w-7xl px-4 py-12 ${isRtl ? "text-right" : "text-left"}`}>
      {/* Hero Card */}
      <Card className="mb-8 transition-shadow hover:shadow-lg">
        <CardContent className="py-8">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-muted-foreground mb-2 text-lg">
                {portfolioConfig.personal.greeting}
              </p>
              <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
                {portfolioConfig.personal.name}
              </h1>
              <h2 className="text-foreground mt-2 text-2xl font-semibold">
                {portfolioConfig.personal.title}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-4xl text-lg leading-relaxed">
              {portfolioConfig.personal.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <div className="mb-6">
        <h2 className="mb-6 text-3xl font-bold">My Skills</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </div>
  );
};

export default HeroSection;
