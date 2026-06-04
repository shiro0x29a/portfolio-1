"use client";

import { useLanguage } from "@/features/i18n";
import { Card, CardContent } from "@/shared/ui/card";
import { portfolioConfig } from "@/shared/lib/config/portfolio";
import Image from "next/image";
import { ScrollDown } from "../ui/scroll-down";
import SkillsSection from "./skills-section";
import styles from "./styles/hero-section.module.css";

const HeroSection = () => {
  const { locale } = useLanguage();
  const isRtl = locale === "ar";

  return (
    <div className={`${styles.container} ${isRtl ? "text-right" : "text-left"}`}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src="/avatar.jpg"
                alt="Shiro 0x29a"
                width={400}
                height={400}
                className={styles.image}
              />
            </div>
            
            <div className={styles.textContent}>
              <div className={styles.titleGroup}>
                <p className={`text-muted-foreground ${styles.greeting}`}>
                  {portfolioConfig.personal.greeting}
                </p>
                <h1 className={styles.name}>
                  {portfolioConfig.personal.name}
                </h1>
                <h2 className={`text-foreground ${styles.title}`}>
                  {portfolioConfig.personal.title}
                </h2>
              </div>
              <p className={`text-muted-foreground ${styles.description}`}>
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
