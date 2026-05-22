"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage, getTranslations, useTranslations } from "@/features/i18n";
import { useAuth } from "@/features/auth";
import { siteConfig } from "@/shared/lib/config/site";
import { Logo } from "@/shared/components/logo";
import { LanguageSwitcher } from "@/features/i18n";
import { ThemeSwitcher } from "@/features/theme";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const Header = () => {
  const { locale } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const isRtl = locale === "ar";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="z-10 flex items-center">
            <Link
              href="/"
              className={cn(
                "text-primary flex items-center gap-2.5 font-bold",
                isRtl && "flex-row-reverse"
              )}
            >
              <Logo size={28} className="h-7 w-7" />
              <div className="flex flex-col text-lg leading-tight font-semibold whitespace-nowrap">
                Portfolio
              </div>
            </Link>
          </div>

          <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex">
            <Link
              href="/"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {t("navigation.home")}
            </Link>
            <Link
              href="/about"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/about"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {t("navigation.about")}
            </Link>
            <Link
              href="/blog/projects"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname?.startsWith("/blog")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              Projects
            </Link>
          </nav>

          <div className="z-10 hidden items-center gap-2 lg:flex">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>

          <div className="z-10 flex items-center gap-2 lg:hidden">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-border bg-background border-t lg:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === "/"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {t("navigation.home")}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === "/about"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {t("navigation.about")}
              </Link>
              <Link
                href="/blog/projects"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname?.startsWith("/blog")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                Projects
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
