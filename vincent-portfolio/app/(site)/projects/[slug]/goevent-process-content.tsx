"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import { normalizeLocale, type Locale as SiteLocale } from "@/lib/site-locale";
import { goeventLocaleCopy } from "./goevent-content-data";
import styles from "./page.module.css";

type GoEventProcessContentProps = {
  project: Project;
  initialLocale?: string;
};

export function GoEventProcessContent({
  project,
  initialLocale,
}: GoEventProcessContentProps) {
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
    <article className={`${styles.goeventPage} ${styles.goeventProcessPage}`}>
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
            href={`/projects/${project.slug}?lang=${locale}`}
            className={styles.goeventBackButton}
            aria-label="Back to project"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={styles.goeventBackIcon}
            >
              <path
                d="M15 18l-6-6 6-6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </Link>
        </div>

        <div className={styles.motionBlock}>
          <section className={styles.goeventProcessPageIntro}>
            <h1 className={styles.goeventProcessPageTitle}>Design process</h1>
          </section>

          <section id="design-process-brief" className={styles.goeventBriefBlock}>
            <h2 className={styles.goeventBriefTitle}>{copy.briefTitle}</h2>
            <p className={styles.goeventBriefCopy}>{copy.briefCopy}</p>
          </section>

          <section
            className={styles.goeventPlatformsBoard}
            aria-label="Platform image"
          >
            <Image
              src="/images/photo01.png"
              alt="GoEvent platform references"
              width={1356}
              height={656}
              className={styles.goeventPlatformsImage}
              unoptimized
            />
          </section>

          <section
            id="design-process-research"
            className={styles.goeventResearchBlock}
          >
            <h2 className={styles.goeventResearchTitle}>{copy.researchTitle}</h2>
            <p className={styles.goeventResearchCopy}>{copy.researchCopy}</p>
          </section>

          <section
            id="design-process-interview"
            className={styles.goeventQuotesSection}
            aria-label="User insights"
          >
            <h2 className={styles.goeventResearchTitle}>
              {copy.interviewSectionTitle}
            </h2>
            <div className={styles.goeventQuotesBoard}>
              <article
                className={`${styles.quoteBubble} ${styles.quoteBubbleLeftWide}`}
              >
                <Image
                  src="/images/goevent-insights/avatar-1.png"
                  alt=""
                  width={33}
                  height={32}
                  className={styles.quoteAvatar}
                  unoptimized
                />
                <p className={styles.quoteText}>{copy.quotes[0]}</p>
              </article>

              <article
                className={`${styles.quoteBubble} ${styles.quoteBubbleRightWide}`}
              >
                <p className={styles.quoteTextSmall}>{copy.quotes[1]}</p>
                <Image
                  src="/images/goevent-insights/avatar-2.png"
                  alt=""
                  width={33}
                  height={32}
                  className={styles.quoteAvatar}
                  unoptimized
                />
              </article>

              <article
                className={`${styles.quoteBubble} ${styles.quoteBubbleLeftNarrow}`}
              >
                <Image
                  src="/images/goevent-insights/avatar-3.png"
                  alt=""
                  width={33}
                  height={32}
                  className={styles.quoteAvatar}
                  unoptimized
                />
                <p className={styles.quoteText}>{copy.quotes[2]}</p>
              </article>
            </div>

            <div
              id="design-process-challenge"
              className={styles.goeventProcessAnchor}
            >
              <h2 className={styles.goeventResearchTitle}>{copy.interviewTitle}</h2>
            </div>
            <p className={styles.goeventResearchCopy}>{copy.interviewCopy}</p>
            <div className={styles.goeventChallengePhotoFrame}>
              <Image
                src="/images/goevent-challenge-photo.png"
                alt={copy.challengeImageAlt}
                width={1024}
                height={768}
                className={styles.goeventChallengePhoto}
              />
            </div>

            <section
              id="design-process-persona"
              className={styles.goeventPersonaCard}
              aria-label={copy.personaTitle}
            >
              <p className={styles.goeventPersonaLabel}>{copy.personaTitle}</p>
              <h3 className={styles.goeventPersonaName}>{copy.personaName}</h3>
              <p className={styles.goeventPersonaCopy}>{copy.personaDetails[0]}</p>
              <p className={styles.goeventPersonaCopy}>{copy.personaDetails[1]}</p>
            </section>

            <section
              id="design-process-cjm"
              className={styles.goeventJourneySection}
              aria-label={copy.cjmTitle}
            >
              <div className={styles.goeventJourneyHeader}>
                <h3 className={styles.goeventJourneyTitle}>{copy.cjmTitle}</h3>
                <p className={styles.goeventJourneySubtitle}>{copy.cjmSubtitle}</p>
              </div>
              <div className={styles.goeventJourneyRail} aria-hidden="true" />
              <div className={styles.goeventJourneyList}>
                {copy.cjmStages.map((stage, index) => (
                  <article key={stage.label} className={styles.goeventJourneyItem}>
                    <div className={styles.goeventJourneyMarker} aria-hidden="true">
                      <span>{index + 1}</span>
                    </div>
                    <div className={styles.goeventJourneyCard}>
                      <p className={styles.goeventJourneyLabel}>{stage.label}</p>
                      <p className={styles.goeventJourneyCopy}>{stage.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </article>
  );
}
