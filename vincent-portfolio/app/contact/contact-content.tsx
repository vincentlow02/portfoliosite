"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { localeCopy, normalizeLocale } from "@/lib/site-locale";
import styles from "./page.module.css";

const contactLinks = [
  {
    key: "email" as const,
    href: "mailto:lowvincent21@gmail.com",
    iconSrc: "/images/contact-icons/email.png",
    iconAlt: "Email icon",
  },
  {
    key: "x" as const,
    href: "https://x.com/vdhhhl?s=21",
    iconSrc: "/images/contact-icons/x.png",
    iconAlt: "X icon",
  },
  {
    key: "ins" as const,
    href: "https://www.instagram.com/vincent_low02?igsh=MWt4NW1hMmZkeTl5ZQ%3D%3D&utm_source=qr",
    iconSrc: "/images/contact-icons/instagram.png",
    iconAlt: "Instagram icon",
  },
  {
    key: "github" as const,
    href: "https://github.com/vincentlow02",
    iconSrc: "/images/contact-icons/github.png",
    iconAlt: "GitHub icon",
  },
  {
    key: "linkedin" as const,
    href: "https://www.linkedin.com/in/vincent-low-sik-ching/",
    iconSrc: "/images/contact-icons/linkedin.png",
    iconAlt: "LinkedIn icon",
  },
];

export function ContactContent() {
  const searchParams = useSearchParams();
  const locale = normalizeLocale(searchParams.get("lang") ?? undefined);
  const copy = localeCopy[locale];
  const totalAssets = contactLinks.length + 1;
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [fallbackReady, setFallbackReady] = useState(false);
  const [isSunny, setIsSunny] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isReady = fallbackReady || loadedAssets >= totalAssets;

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setFallbackReady(true);
    }, 260);

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

  const markAssetLoaded = () => {
    setLoadedAssets((count) => count + 1);
  };

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
            onLoad={markAssetLoaded}
          />
        </Link>

        <div className={styles.motionBlock}>
          <h1 className={styles.title}>{copy.connectTitle}</h1>

          <nav aria-label="Contact links" className={styles.links}>
            {contactLinks.map((item, index) => (
              <a
                key={item.key}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  item.href.startsWith("mailto:")
                    ? undefined
                    : "noreferrer noopener"
                }
                className={styles.link}
                style={{ "--enter-delay": `${130 + index * 55}ms` } as CSSProperties}
              >
                <span className={styles.linkInner}>
                  <Image
                    src={item.iconSrc}
                    alt={item.iconAlt}
                    width={18}
                    height={18}
                    className={styles.linkIcon}
                    loading="eager"
                    onLoad={markAssetLoaded}
                  />
                  <span>{copy.contactLabels[item.key]}</span>
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}
