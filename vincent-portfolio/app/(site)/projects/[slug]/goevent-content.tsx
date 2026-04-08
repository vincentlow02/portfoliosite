"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import { normalizeLocale, type Locale as SiteLocale } from "@/lib/site-locale";
import { goeventLocaleCopy } from "./goevent-content-data";
import styles from "./page.module.css";

type GoEventContentProps = {
  project: Project;
  initialLocale?: string;
};

export function GoEventContent({
  project,
  initialLocale,
}: GoEventContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<SiteLocale>(() =>
    normalizeLocale(initialLocale),
  );
  const [isReady, setIsReady] = useState(false);
  const copy = goeventLocaleCopy[locale];

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setIsReady(true);
    }, 220);

    return () => {
      window.clearTimeout(fallback);
    };
  }, []);

  const handleLocaleChange = (nextLocale: SiteLocale) => {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", nextLocale);
    setLocale(nextLocale);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <article className={styles.goeventPage}>
      <div
        className={styles.localeSwitch}
        role="group"
        aria-label="Language"
      >
        {[
          { key: "en", label: "EN" },
          { key: "zh", label: "中" },
          { key: "ja", label: "日" },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            className={`${styles.localeButton} ${
              locale === item.key ? styles.localeButtonActive : ""
            }`}
            onClick={() => handleLocaleChange(item.key as SiteLocale)}
            aria-pressed={locale === item.key}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className={`${styles.goeventStack} ${
          isReady ? styles.frameReady : styles.framePending
        }`}
      >
        <div className={styles.goeventHeaderBlock}>
          <Link
            href={`/?lang=${locale}`}
            className={styles.goeventAvatarWrap}
            aria-label="Back to home"
          >
            <Image
              src="/images/goevent-avatar.png"
              alt="GoEvent avatar"
              width={33}
              height={32}
              className={styles.goeventAvatar}
              priority
              onLoad={() => setIsReady(true)}
            />
          </Link>
        </div>

        <div className={styles.motionBlock}>
          <div className={styles.goeventCopy}>
            <h1 className={styles.goeventTitle}>{project.name}</h1>
            <p className={styles.goeventSummary}>{copy.summary}</p>
          </div>

          <dl className={styles.goeventMeta}>
            <div className={styles.goeventMetaItem}>
              <dt className={styles.goeventMetaLabel}>{copy.locationLabel}</dt>
              <dd className={styles.goeventMetaValue}>{copy.locationValue}</dd>
            </div>
            <div className={styles.goeventMetaItem}>
              <dt className={styles.goeventMetaLabel}>{copy.dateLabel}</dt>
              <dd className={styles.goeventMetaValue}>{copy.dateValue}</dd>
            </div>
          </dl>

          <div className={styles.goeventHeroFrame}>
            <Image
              src="/images/goeventphoto.png"
              alt="GoEvent app preview"
              width={3092}
              height={1924}
              className={styles.goeventHeroImage}
              priority
              unoptimized
            />
          </div>

          <section className={styles.goeventProcessSection} aria-label="Design process">
            <h2 className={styles.goeventProcessTitle}>Design process</h2>
            <Link
              href={`/projects/${project.slug}/process?lang=${locale}`}
              className={styles.goeventProcessCard}
            >
              <div className={styles.goeventProcessCopy}>
                <h3 className={styles.goeventProcessCardTitle}>Project brief → CJM</h3>
                <p className={styles.goeventProcessCardPreview}>
                  View the full process from project brief, research, and user
                  interview through challenge, persona, and journey map.
                </p>
              </div>
              <div
                className={`${styles.goeventProcessThumb} ${styles.goeventProcessThumbCjm}`}
                aria-hidden="true"
              >
                <div className={styles.goeventProcessThumbInner} />
              </div>
            </Link>
          </section>

          <section
            className={styles.goeventSolutionSection}
            aria-label={copy.designSolutionTitle}
          >
            <div className={styles.goeventSolutionHeader}>
              <h3 className={styles.goeventSolutionTitle}>
                {copy.designSolutionTitle}
              </h3>
            </div>
            <div className={styles.goeventSolutionList}>
              {copy.designSolutionSteps.map((step, index) => (
                <article key={index} className={styles.goeventSolutionCard}>
                  <div className={styles.goeventSolutionMedia}>
                    <Image
                      src={step.imageSrc}
                      alt={step.alt}
                      width={3092}
                      height={1924}
                      className={`${styles.goeventSolutionImage} ${styles[step.imageClass]} ${styles[step.visualClass]}`}
                      unoptimized
                    />
                  </div>
                  <p className={styles.goeventSolutionOverlayLabel}>
                    {step.overlayLabel}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
