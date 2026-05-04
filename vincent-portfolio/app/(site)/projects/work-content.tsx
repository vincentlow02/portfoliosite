"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import type { Locale as SiteLocale } from "@/lib/site-locale";
import styles from "./page.module.css";

type WorkContentProps = {
  locale: SiteLocale;
  title: string;
  avatarAlt: string;
  projects: Project[];
};

export function WorkContent({
  locale,
  title,
  avatarAlt,
  projects,
}: WorkContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(locale);

  const handleLocaleChange = (nextLocale: SiteLocale) => {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", nextLocale);
    setCurrentLocale(nextLocale);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setIsReady(true);
    }, 220);

    return () => {
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <article className={styles.page} aria-labelledby="work-title">
      <div className={styles.localeSwitch} role="group" aria-label="Language">
        {[
          { key: "en", label: "EN" },
          { key: "zh", label: "中" },
          { key: "ja", label: "日" },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            className={`${styles.localeButton} ${
              currentLocale === item.key ? styles.localeButtonActive : ""
            }`}
            onClick={() => handleLocaleChange(item.key as SiteLocale)}
            aria-pressed={currentLocale === item.key}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className={`${styles.frame} ${
          isReady ? styles.frameReady : styles.framePending
        }`}
      >
        <Link href={`/?lang=${currentLocale}`} className={styles.avatarLink}>
          <Image
            src="/images/goevent-avatar.png"
            alt={avatarAlt}
            width={44}
            height={44}
            className={styles.avatar}
            priority
            loading="eager"
            fetchPriority="high"
            onLoad={() => setIsReady(true)}
          />
        </Link>

        <section className={styles.motionBlock}>
          <h1 id="work-title" className={styles.title}>
            {title}
          </h1>

          <div className={styles.list}>
            {projects.map((project) => {
              const isWeaveAI = project.slug === "weave-ai";
              const isGoEvent = project.slug === "goevent";
              const href = isWeaveAI
                ? "https://seminardesign-app.vercel.app/"
                : isGoEvent
                  ? "https://goevent.vercel.app/"
                  : `/projects/${project.slug}?lang=${currentLocale}`;
              const isExternal = isWeaveAI || isGoEvent;

              return (
                <Fragment key={project.slug}>
                  <Link
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer noopener" : undefined}
                    className={styles.item}
                  >
                    {project.slug === "weave-ai" ? (
                      <Image
                        src="/images/weaveAI-optimized.webp"
                        alt=""
                        width={1800}
                        height={1122}
                        className={`${styles.itemImage} ${styles.itemImageWeave}`}
                        priority
                      />
                    ) : null}
                    {project.slug === "goevent" ? (
                      <Image
                        src="/images/goevent01-optimized.webp"
                        alt=""
                        width={1800}
                        height={1352}
                        className={`${styles.itemImage} ${styles.itemImageGoevent}`}
                      />
                    ) : null}
                    <span className={styles.itemTextRow}>
                      <span className={styles.itemTitle}>{project.name}</span>
                      <span className={styles.itemYear}>{project.year}</span>
                    </span>
                  </Link>
                  {project.slug === "weave-ai" ? (
                    <Link
                      href="https://vincentlow02.github.io/Seminarapp-/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className={styles.item}
                    >
                      <Image
                        src="/images/prototype-optimized.webp"
                        alt=""
                        width={1536}
                        height={1024}
                        className={`${styles.itemImage} ${styles.itemImagePrototype}`}
                      />
                      <span className={styles.itemTextRow}>
                        <span className={styles.itemTitle}>
                          Weave AI Interactive Exhibition Experience
                        </span>
                      </span>
                    </Link>
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
