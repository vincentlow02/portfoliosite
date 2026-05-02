"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import { normalizeLocale, type Locale as SiteLocale } from "@/lib/site-locale";
import styles from "./page.module.css";

type WeaveAIContentProps = {
  project: Project;
  initialLocale?: string;
};

const weaveLocaleCopy: Record<
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
    videoLabel: string;
    researchTitle: string;
    framingQuestionTitle: string;
    framingQuestion: string;
  }
> = {
  en: {
    languageLabel: "Language",
    backToHomeLabel: "Back to home",
    title: "Weave AI",
    summary:
      "Weave AI is a speculative concept for a 2045 seminar exhibition, exploring how AI agents could guide future travel discovery and decision-making.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "September 2025 → December 2025",
    videoLabel: "Weave AI concept preview",
    researchTitle:
      "Team Research: From 2025 Technology to Life with AI Agents in 2045",
    framingQuestionTitle: "Framing the Question:",
    framingQuestion:
      "In a future where AI agents can recommend destinations, where does uncertainty still remain in the travel decision process?",
  },
  zh: {
    languageLabel: "语言",
    backToHomeLabel: "返回首页",
    title: "Weave AI",
    summary:
      "Weave AI 是一个面向 2045 年研讨会展览的推测性概念，探索 AI 代理如何引导未来的旅行发现与决策。",
    locationLabel: "地点",
    locationValue: "日本东京",
    dateLabel: "日期",
    dateValue: "2025 年 9 月 → 2025 年 12 月",
    videoLabel: "Weave AI 概念预览",
    researchTitle: "团队研究：从 2025 年技术到 2045 年 AI 代理生活",
    framingQuestionTitle: "界定问题：",
    framingQuestion:
      "在 AI 代理能够推荐目的地的未来，旅行决策过程中不确定性仍会存在于哪里？",
  },
  ja: {
    languageLabel: "言語",
    backToHomeLabel: "ホームへ戻る",
    title: "Weave AI",
    summary:
      "Weave AI は、2045 年のセミナー展示に向けたスペキュラティブなコンセプトです。AI エージェントが未来の旅の発見と意思決定をどのように導けるかを探ります。",
    locationLabel: "場所",
    locationValue: "東京、日本",
    dateLabel: "日付",
    dateValue: "2025 年 9 月 → 2025 年 12 月",
    videoLabel: "Weave AI コンセプトプレビュー",
    researchTitle:
      "チームリサーチ：2025年の技術から2045年のAIエージェントとの生活へ",
    framingQuestionTitle: "問いを定義する：",
    framingQuestion:
      "AIエージェントが目的地を推薦できる未来において、旅の意思決定プロセスのどこに不確実性は残るのか？",
  },
};

export function WeaveAIContent({
  project,
  initialLocale,
}: WeaveAIContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<SiteLocale>(() =>
    normalizeLocale(initialLocale),
  );
  const copy = weaveLocaleCopy[locale];

  const handleLocaleChange = (nextLocale: SiteLocale) => {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", nextLocale);
    setLocale(nextLocale);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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

          <div className={`${styles.goeventHeroFrame} ${styles.weaveHeroFrame}`}>
            <video
              className={`${styles.goeventHeroImage} ${styles.weaveHeroVideo}`}
              src="/videos/weave1.mp4"
              aria-label={copy.videoLabel}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>

          <section className={styles.weaveResearchSection}>
            <h2 className={styles.weaveResearchTitle}>{copy.researchTitle}</h2>
            <Image
              src="/images/research-optimized.webp"
              alt=""
              width={2400}
              height={1536}
              className={styles.weaveResearchImage}
            />
          </section>

          <section className={styles.weaveFramingSection}>
            <h2 className={styles.weaveResearchTitle}>
              {copy.framingQuestionTitle}
            </h2>
            <div className={styles.weaveQuestionCard}>
              <p className={styles.weaveQuestionText}>{copy.framingQuestion}</p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
