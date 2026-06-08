"use client";

import { useLanguage } from "@/features/i18n";
import { Card, CardContent } from "@/shared/ui/card";
import { portfolioConfig } from "@/shared/lib/config/portfolio";
import Image from "next/image";
import { ScrollDown } from "../ui/scroll-down";
import SkillsSection from "./skills-section";
import Typewriter from "../ui/typewriter";
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
                  <Typewriter texts={portfolioConfig.personal.titles} />
                </h2>
              </div>
              <p className={`text-muted-foreground ${styles.description}`}>
                {portfolioConfig.personal.description}
              </p>
              <div className={styles.cta}>
                <a href="#projects" className={styles.primary}>
                  View Projects
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
                <a href="#contact" className={styles.secondary}>
                  Get in Touch
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </a>
              </div>
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
