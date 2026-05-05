"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/types/project";
import { normalizeLocale, type Locale as SiteLocale } from "@/lib/site-locale";
import styles from "./page.module.css";

type LemonYuzuContentProps = {
  project: Project;
  initialLocale?: string;
};

const lemonLocaleCopy: Record<
  SiteLocale,
  {
    languageLabel: string;
    backToHomeLabel: string;
    title: string;
    summary: string;
    locationLabel: string;
    locationValue: string;
    dateLabel: string;
    dateValue: string;
    imageAlt: string;
    designProcessTitle: string;
    designProcessAlt: string;
  }
> = {
  en: {
    languageLabel: "Language",
    backToHomeLabel: "Back to home",
    title: "Lemon Yuzu Fruit Tea",
    summary:
      "Exploring how fruit tea packaging can communicate freshness, beauty, and a gentle moment of relaxation in everyday life.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "April 2024 - June 2024",
    imageAlt: "Lemon Yuzu Fruit Tea packaging design.",
    designProcessTitle: "Design Process",
    designProcessAlt: "Lemon Yuzu Fruit Tea design process.",
  },
  zh: {
    languageLabel: "Language",
    backToHomeLabel: "Back to home",
    title: "Lemon Yuzu Fruit Tea",
    summary:
      "Exploring how fruit tea packaging can communicate freshness, beauty, and a gentle moment of relaxation in everyday life.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "April 2024 - June 2024",
    imageAlt: "Lemon Yuzu Fruit Tea packaging design.",
    designProcessTitle: "设计流程",
    designProcessAlt: "Lemon Yuzu Fruit Tea 设计流程。",
  },
  ja: {
    languageLabel: "Language",
    backToHomeLabel: "Back to home",
    title: "Lemon Yuzu Fruit Tea",
    summary:
      "Exploring how fruit tea packaging can communicate freshness, beauty, and a gentle moment of relaxation in everyday life.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "April 2024 - June 2024",
    imageAlt: "Lemon Yuzu Fruit Tea packaging design.",
    designProcessTitle: "デザインプロセス",
    designProcessAlt: "Lemon Yuzu Fruit Tea のデザインプロセス。",
  },
};

const lemonIntroCopy: Record<
  SiteLocale,
  {
    languageLabel: string;
    backToHomeLabel: string;
    title: string;
    summary: string;
    locationLabel: string;
    locationValue: string;
    dateLabel: string;
    dateValue: string;
    imageAlt: string;
    designProcessTitle: string;
    designProcessAlt: string;
  }
> = {
  en: {
    languageLabel: "Language",
    backToHomeLabel: "Back to home",
    title: "Lemon Yuzu Fruit Tea",
    summary:
      "Exploring how fruit tea packaging can communicate freshness, beauty, and a gentle moment of relaxation in everyday life.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "April 2024 - June 2024",
    imageAlt: "Lemon Yuzu Fruit Tea packaging design.",
    designProcessTitle: "Design Process",
    designProcessAlt: "Lemon Yuzu Fruit Tea design process.",
  },
  zh: {
    languageLabel: "语言",
    backToHomeLabel: "返回首页",
    title: "柠檬柚子水果茶",
    summary:
      "探索水果茶包装如何在日常生活中传达清新、美感，以及一段温柔放松的片刻。",
    locationLabel: "地点",
    locationValue: "日本东京",
    dateLabel: "日期",
    dateValue: "2024 年 4 月 - 2024 年 6 月",
    imageAlt: "柠檬柚子水果茶包装设计。",
    designProcessTitle: "设计流程",
    designProcessAlt: "柠檬柚子水果茶设计流程。",
  },
  ja: {
    languageLabel: "言語",
    backToHomeLabel: "ホームへ戻る",
    title: "レモン柚子フルーツティー",
    summary:
      "フルーツティーのパッケージが、日常の中で新鮮さ、美しさ、そして穏やかなリラックスの時間をどのように伝えられるかを探りました。",
    locationLabel: "場所",
    locationValue: "東京、日本",
    dateLabel: "日付",
    dateValue: "2024 年 4 月 - 2024 年 6 月",
    imageAlt: "レモン柚子フルーツティーのパッケージデザイン。",
    designProcessTitle: "デザインプロセス",
    designProcessAlt: "レモン柚子フルーツティーのデザインプロセス。",
  },
};

const lemonProcessCopy: Record<
  SiteLocale,
  {
    title: string;
    body: string;
    visualIdentityTitle: string;
    packagingTitle: string;
    productTitle: string;
    webDesignTitle: string;
    andManyMoreTitle: string;
  }
> = {
  en: {
    title: "Design process",
    body:
      "Based on a concept shaped through research and interviews, I refined the package through prototyping to express low calories, beauty ingredients, relaxation, fruit freshness, and tea.",
    visualIdentityTitle: "Visual Identity",
    packagingTitle: "Packaging",
    productTitle: "Product",
    webDesignTitle: "Web Design",
    andManyMoreTitle: "And many more...",
  },
  zh: {
    title: "设计流程",
    body:
      "基于调研与访谈得出的“低卡路里 × 美容成分 × 放松体验”概念，我通过多次试作与改进，完成了兼具水果感与茶元素的清爽包装。",
    visualIdentityTitle: "视觉识别",
    packagingTitle: "包装",
    productTitle: "产品",
    webDesignTitle: "网页设计",
    andManyMoreTitle: "还有更多...",
  },
  ja: {
    title: "デザインプロセス",
    body:
      "リサーチとインタビューを通じて導いた「低カロリー × 美容成分 × リラックス体験」のコンセプトを基に、試作と改善を重ね、フルーツ感とお茶の要素を兼ね備えたシンプルで爽やかなパッケージを完成しました。",
    visualIdentityTitle: "ビジュアルアイデンティティ",
    packagingTitle: "パッケージ",
    productTitle: "プロダクト",
    webDesignTitle: "Webデザイン",
    andManyMoreTitle: "And many more...",
  },
};

export function LemonYuzuContent({
  project,
  initialLocale,
}: LemonYuzuContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<SiteLocale>(() =>
    normalizeLocale(initialLocale),
  );
  const copy = { ...lemonLocaleCopy[locale], ...lemonIntroCopy[locale] };
  const processCopy = lemonProcessCopy[locale];

  const handleLocaleChange = (nextLocale: SiteLocale) => {
    setLocale(nextLocale);
    router.replace(`${pathname}?lang=${nextLocale}`, { scroll: false });
  };

  return (
    <article className={styles.weavePage} aria-label={project.name}>
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

      <div className={styles.weaveStack}>
        <div className={styles.weaveHeaderBlock}>
          <Link
            href={`/?lang=${locale}`}
            className={styles.weaveAvatarLink}
            aria-label={copy.backToHomeLabel}
          >
            <Image
              src="/images/goevent-avatar.png"
              alt=""
              width={44}
              height={44}
              className={styles.weaveAvatar}
              priority
            />
          </Link>
        </div>

        <div className={styles.weaveIntro}>
          <div className={styles.weaveCopy}>
            <h1 className={styles.weaveTitle}>{copy.title}</h1>
            <p className={styles.weaveSummary}>{copy.summary}</p>
          </div>

          <dl className={styles.weaveMeta}>
            <div className={styles.weaveMetaItem}>
              <dt className={styles.weaveMetaLabel}>{copy.locationLabel}</dt>
              <dd className={styles.weaveMetaValue}>{copy.locationValue}</dd>
            </div>
            <div className={styles.weaveMetaItem}>
              <dt className={styles.weaveMetaLabel}>{copy.dateLabel}</dt>
              <dd className={styles.weaveMetaValue}>{copy.dateValue}</dd>
            </div>
          </dl>

          <div className={`${styles.goeventHeroFrame} ${styles.lemonHeroFrame}`}>
            <Image
              src="/images/packaging01-optimized.webp"
              alt={copy.imageAlt}
              width={1491}
              height={1055}
              className={`${styles.goeventHeroImage} ${styles.lemonHeroImage}`}
              priority
            />
          </div>

          <section className={styles.lemonProcessSection}>
            <div className={styles.lemonProcessGraphic}>
              <Image
                src="/images/designprocess.svg"
                alt={copy.designProcessAlt}
                width={1282}
                height={882}
                className={styles.lemonProcessImage}
                unoptimized
              />
              <div className={styles.lemonProcessTextOverlay}>
                <h2 className={styles.lemonProcessTitle}>
                  {processCopy.title}
                </h2>
                <p className={styles.lemonProcessBody}>{processCopy.body}</p>
              </div>
            </div>
          </section>

          <section className={styles.lemonVisualSection}>
            <h2 className={styles.weaveResearchTitle}>
              {processCopy.visualIdentityTitle}
            </h2>
            <Image
              src="/images/visualidentity.svg"
              alt={processCopy.visualIdentityTitle}
              width={1284}
              height={722}
              className={styles.lemonVisualImage}
              unoptimized
            />
          </section>

          <section className={styles.lemonVisualSection}>
            <h2 className={styles.weaveResearchTitle}>
              {processCopy.packagingTitle}
            </h2>
            <Image
              src="/images/packaging.svg"
              alt={processCopy.packagingTitle}
              width={1284}
              height={537}
              className={styles.lemonVisualImage}
              unoptimized
            />
          </section>

          <section className={styles.lemonVisualSection}>
            <h2 className={styles.weaveResearchTitle}>
              {processCopy.productTitle}
            </h2>
            <Image
              src="/images/product.svg"
              alt={processCopy.productTitle}
              width={1288}
              height={1060}
              className={styles.lemonVisualImage}
              unoptimized
            />
          </section>

          <section className={styles.lemonVisualSection}>
            <h2 className={styles.weaveResearchTitle}>
              {processCopy.webDesignTitle}
            </h2>
            <Image
              src="/images/web-optimized.webp"
              alt={processCopy.webDesignTitle}
              width={5120}
              height={3328}
              className={styles.lemonVisualImage}
            />
          </section>

          <footer className={`${styles.goeventFooter} ${styles.lemonFooter}`}>
            <h2 className={styles.andManyMoreTitle}>
              {processCopy.andManyMoreTitle}
            </h2>
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
