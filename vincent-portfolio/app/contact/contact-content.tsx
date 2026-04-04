"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
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
  const isReady = fallbackReady || loadedAssets >= totalAssets;

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setFallbackReady(true);
    }, 260);

    return () => {
      window.clearTimeout(fallback);
    };
  }, []);

  const markAssetLoaded = () => {
    setLoadedAssets((count) => count + 1);
  };

  return (
    <main className={styles.page}>
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
