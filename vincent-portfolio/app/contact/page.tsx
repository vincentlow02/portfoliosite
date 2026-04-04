import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { localeCopy, normalizeLocale } from "@/lib/site-locale";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

const contactLinks = [
  {
    key: "email" as const,
    href: "mailto:lowvincent21@gmail.com",
  },
  {
    key: "x" as const,
    href: "https://x.com/vdhhhl?s=21",
  },
  {
    key: "ins" as const,
    href: "https://www.instagram.com/vincent_low02?igsh=MWt4NW1hMmZkeTl5ZQ%3D%3D&utm_source=qr",
  },
  {
    key: "github" as const,
    href: "https://github.com/vincentlow02",
  },
  {
    key: "linkedin" as const,
    href: "https://www.linkedin.com/in/vincent-low-sik-ching/",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Connect",
  description: "How to get in touch with Vincent Low Sik Ching.",
  pathname: "/contact",
});

type ContactPageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
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
                {copy.contactLabels[item.key]}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}
