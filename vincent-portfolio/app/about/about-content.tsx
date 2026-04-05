"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { localeCopy, normalizeLocale } from "@/lib/site-locale";
import styles from "./page.module.css";

export function AboutContent() {
  const searchParams = useSearchParams();
  const locale = normalizeLocale(searchParams.get("lang") ?? undefined);
  const copy = localeCopy[locale];
  const [isReady, setIsReady] = useState(false);
  const [isSunny, setIsSunny] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setIsReady(true);
    }, 220);

    return () => {
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isSunny) {
      video.currentTime = 0;
      video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isSunny]);

  return (
    <main className={styles.page}>
      <div
        className={`${styles.sunOverlay} ${isSunny ? styles.sunOverlayActive : ""}`}
        aria-hidden="true"
      >
        <div className={styles.sunOverlayTint} />
        <video
          ref={videoRef}
          className={styles.sunOverlayVideo}
          src="https://theme-switch.pages.dev/assets/leaves.mp4"
          loop
          muted
          playsInline
          preload="none"
        />
      </div>
      <button
        type="button"
        className={`${styles.sunToggle} ${isSunny ? styles.sunToggleActive : ""}`}
        onClick={() => setIsSunny((current) => !current)}
        role="switch"
        aria-checked={isSunny}
        aria-label="Let the sun in"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4.5" />
          <line x1="12" y1="19.5" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
          <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4.5" y2="12" />
          <line x1="19.5" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
          <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
        </svg>
      </button>
      <div className={`${styles.frame} ${isReady ? styles.frameReady : styles.framePending}`}>
        <Link
          href={`/?lang=${locale}`}
          className={styles.avatarWrap}
          aria-label="Back to home"
        >
          <Image
            src="/images/profile-alt.png"
            alt="Portrait of Vincent Low Sik Ching"
            width={56}
            height={56}
            className={styles.avatar}
            priority
            loading="eager"
            fetchPriority="high"
            onLoad={() => setIsReady(true)}
          />
        </Link>

        <div className={styles.motionBlock}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{copy.aboutTitle}</h1>
            <a
              href="https://student.redesigner.jp/students/c826c67af54aeecf009cddbe3b873303"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.portfolioLink}
            >
              VIEW PORTFOLIO
            </a>
          </div>

          <div className={styles.copy}>
            {copy.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Link href={`/contact?lang=${locale}`} className={styles.connect}>
            {copy.connectLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
