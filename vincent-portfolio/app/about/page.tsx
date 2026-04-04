import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localeCopy, normalizeLocale } from "@/lib/site-locale";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "About Vincent Low Sik Ching, an Industrial Design student at Tokyo Zokei University.",
  pathname: "/about",
});

type AboutPageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const { lang } = await searchParams;
  const locale = normalizeLocale(lang);
  const copy = localeCopy[locale];

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
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
