"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import { normalizeLocale, type Locale as SiteLocale } from "@/lib/site-locale";
import {
  goeventLocaleCopy,
  type GoEventDetailImage,
} from "./goevent-content-data";
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

  const renderDetailImages = (images: GoEventDetailImage[]) => (
    <div className={styles.goeventSolutionDetailList}>
      {images.map((detailImage) => (
        <article
          key={detailImage.src}
          className={styles.goeventSolutionDetailCard}
        >
          {detailImage.titlePosition === "top" ? (
            <p
              className={`${styles.goeventSolutionOverlayLabel} ${styles.goeventSolutionOverlayLabelTop}`}
            >
              {detailImage.label}
            </p>
          ) : null}
          <div className={styles.goeventSolutionMedia}>
            <Image
              src={detailImage.src}
              alt={detailImage.alt}
              width={detailImage.width}
              height={detailImage.height}
              className={`${styles.goeventSolutionImage} ${
                detailImage.width > detailImage.height
                  ? styles.goeventSolutionVisualWide
                  : styles.goeventSolutionVisualTall
              } ${styles.goeventSolutionImagePhone}`}
              unoptimized
            />
          </div>
          {detailImage.titlePosition !== "top" ? (
            <p className={styles.goeventSolutionOverlayLabel}>
              {detailImage.label}
            </p>
          ) : null}
          {detailImage.headline ? (
            <p className={styles.goeventSolutionCardHeadline}>
              {detailImage.headline}
            </p>
          ) : null}
          {detailImage.detailImages?.length
            ? renderDetailImages(detailImage.detailImages)
            : null}
        </article>
      ))}
    </div>
  );

  return (
    <article className={styles.goeventPage}>
      <div
        className={styles.localeSwitch}
        role="group"
        aria-label={copy.languageLabel}
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
            aria-label={copy.backToHomeLabel}
          >
            <Image
              src="/images/goevent-avatar.png"
              alt={copy.avatarAlt}
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
              alt={copy.heroImageAlt}
              width={3092}
              height={1924}
              className={styles.goeventHeroImage}
              priority
              unoptimized
            />
          </div>

          <section
            className={styles.goeventProcessSection}
            aria-label={copy.processSectionTitle}
          >
            <h2 className={styles.goeventProcessTitle}>
              {copy.processSectionTitle}
            </h2>
            <Link
              href={`/projects/${project.slug}/process?lang=${locale}`}
              className={styles.goeventProcessCard}
            >
              <div className={styles.goeventProcessCopy}>
                <h3 className={styles.goeventProcessCardTitle}>
                  {copy.processCardTitle}
                </h3>
                <p className={styles.goeventProcessCardPreview}>
                  {copy.processCardPreview}
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
              {(() => {
                const [solutionLabel, solutionHeadline] =
                  copy.designSolutionTitle.split("\n");

                return (
                  <h3 className={styles.goeventSolutionTitle}>
                    <span className={styles.goeventSolutionTitleLabel}>
                      {solutionLabel}
                    </span>
                    <span className={styles.goeventSolutionTitleHeadline}>
                      {solutionHeadline ?? solutionLabel}
                    </span>
                  </h3>
                );
              })()}
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
                  {step.headline ? (
                    <p className={styles.goeventSolutionCardHeadline}>
                      {step.headline}
                    </p>
                  ) : null}
                  {step.detailImages?.length
                    ? renderDetailImages(step.detailImages)
                    : null}
                </article>
              ))}
            </div>
          </section>

          <footer className={styles.goeventFooter}>
            <h2 className={styles.andManyMoreTitle}>{copy.andManyMoreLabel}</h2>
            <hr className={styles.footerDivider} />
            <Link href={`/?lang=${locale}`} className={styles.footerBackLink}>
              ← {copy.backToHomeLabel}
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}
