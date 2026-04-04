"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { localeCopy, normalizeLocale } from "@/lib/site-locale";
import styles from "./page.module.css";

export function AboutContent() {
  const searchParams = useSearchParams();
  const locale = normalizeLocale(searchParams.get("lang") ?? undefined);
  const copy = localeCopy[locale];
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setIsReady(true);
    }, 220);

    return () => {
      window.clearTimeout(fallback);
    };
  }, []);

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
            onLoad={() => setIsReady(true)}
          />
        </Link>

        <div className={styles.motionBlock}>
          <h1 className={styles.title}>{copy.aboutTitle}</h1>

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
