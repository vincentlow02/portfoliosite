"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/types/project";
import type { Locale as SiteLocale } from "@/lib/site-locale";
import styles from "./page.module.css";

type WorkContentProps = {
  locale: SiteLocale;
  projects: Project[];
};

type WorkItem = {
  id: string;
  title: string;
  year: string;
  category: string;
  href: string;
  external: boolean;
  image: {
    src: string;
    width: number;
    height: number;
    className?: string;
  };
};

const WORK_UI_COPY: Record<
  SiteLocale,
  {
    title: string;
    email: string;
    projectIndexLabel: string;
    portfolioLabel: string;
    languageLabel: string;
    goeventTitle: string;
    interactiveTitle: string;
    lemonTitle: string;
  }
> = {
  en: {
    title: "Work",
    email: "Email",
    projectIndexLabel: "Project index",
    portfolioLabel: "Portfolio projects",
    languageLabel: "Language",
    goeventTitle: "GoEvent (case study)",
    interactiveTitle: "Weave AI Interactive Exhibition Experience",
    lemonTitle: "Lemon Yuzu Fruit Tea",
  },
  zh: {
    title: "项目",
    email: "Email",
    projectIndexLabel: "项目索引",
    portfolioLabel: "作品项目",
    languageLabel: "语言",
    goeventTitle: "GoEvent（案例研究）",
    interactiveTitle: "Weave AI 互动展览体验",
    lemonTitle: "柠檬柚子水果茶",
  },
  ja: {
    title: "制作",
    email: "Email",
    projectIndexLabel: "制作一覧",
    portfolioLabel: "ポートフォリオ制作",
    languageLabel: "言語",
    goeventTitle: "GoEvent（ケーススタディ）",
    interactiveTitle: "Weave AI インタラクティブ展示体験",
    lemonTitle: "レモン柚子フルーツティー",
  },
};

export function WorkContent({
  locale,
  projects,
}: WorkContentProps) {
  const [isReady, setIsReady] = useState(false);
  const copy = WORK_UI_COPY[locale];

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setIsReady(true);
    }, 220);

    return () => {
      window.clearTimeout(fallback);
    };
  }, []);

  const workItems = projects.flatMap<WorkItem>((project) => {
    const isWeaveAI = project.slug === "weave-ai";
    const href = project.url ?? `/projects/${project.slug}?lang=${locale}`;

    const imageBySlug: Record<string, WorkItem["image"]> = {
      curio: {
        src: "/images/projects/curio/curio-cover-v1.png",
        width: 1920,
        height: 1200,
      },
      "weave-ai": {
        src: "/images/projects/weave-ai/weaveAI-optimized.webp",
        width: 1800,
        height: 1122,
      },
      goevent: {
        src: "/images/projects/goevent/goevent01-optimized.webp",
        width: 1800,
        height: 1352,
      },
      intoday: {
        src: "/images/projects/intoday/intoday-cover-v5.jpg",
        width: 1000,
        height: 600,
      },
      "lemon-yuzu-fruit-tea": {
        src: "/images/projects/lemon-yuzu-fruit-tea/packaging01-optimized.webp",
        width: 1491,
        height: 1055,
      },
    };

    const baseItem: WorkItem = {
      id: project.slug,
      title:
        project.slug === "goevent"
          ? copy.goeventTitle
          : project.slug === "lemon-yuzu-fruit-tea"
            ? copy.lemonTitle
            : project.name,
      year: project.year,
      category: project.category,
      href,
      external: Boolean(project.url),
      image: imageBySlug[project.slug],
    };

    if (!isWeaveAI) {
      return [baseItem];
    }

    return [
      baseItem,
      {
        id: "weave-ai-interactive",
        title: copy.interactiveTitle,
        year: "2025",
        category: "Interactive exhibition experience",
        href: "https://vincentlow02.github.io/weave-destination-experience/",
        external: true,
        image: {
          src: "/images/projects/weave-ai/prototype-optimized.webp",
          width: 1536,
          height: 1024,
        },
      },
    ];
  });

  return (
    <article className={styles.page} aria-labelledby="work-title">
      <div
        className={`${styles.frame} ${
          isReady ? styles.frameReady : styles.framePending
        }`}
      >
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Link href={`/?lang=${locale}`} className={styles.wordmark}>
              VL
            </Link>
            <h1 id="work-title" className={styles.sidebarTitle}>
              {copy.title}
            </h1>
          </div>

          <div className={styles.information}>
            <div className={styles.socialLinks}>
              <a href="mailto:lowvincent21@gmail.com">{copy.email}</a>
              <a
                href="https://www.linkedin.com/in/vincent-low-sik-ching/"
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/vincent_low02"
                target="_blank"
                rel="noreferrer noopener"
              >
                Instagram
              </a>
              <a
                href="https://github.com/vincentlow02"
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
              </a>
            </div>
          </div>

          <nav className={styles.projectIndex} aria-label={copy.projectIndexLabel}>
            {workItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer noopener" : undefined}
                className={styles.indexLink}
              >
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          <nav className={styles.languageSwitch} aria-label={copy.languageLabel}>
            {[
              { key: "en", label: "EN" },
              { key: "zh", label: "中" },
              { key: "ja", label: "日" },
            ].map((item) => (
              <Link
                key={item.key}
                href={`/projects?lang=${item.key}`}
                className={`${styles.languageLink} ${
                  locale === item.key ? styles.languageLinkActive : ""
                }`}
                aria-current={locale === item.key ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className={styles.content}>
          <section className={styles.grid} aria-label={copy.portfolioLabel}>
            {workItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer noopener" : undefined}
                className={styles.card}
                style={{ "--card-delay": `${120 + index * 55}ms` } as React.CSSProperties}
              >
                <div className={styles.imageFrame}>
                  <Image
                    src={item.image.src}
                    alt=""
                    width={item.image.width}
                    height={item.image.height}
                    className={styles.cardImage}
                    priority={index < 4}
                    sizes="(min-width: 1280px) 22vw, (min-width: 900px) 30vw, (min-width: 640px) 46vw, 100vw"
                    unoptimized
                  />
                </div>
                <span className={styles.cardTitleRow}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.cardYear}>{item.year}</span>
                </span>
              </Link>
            ))}
          </section>
        </main>
      </div>
    </article>
  );
}
