"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { normalizeLocale, type Locale as SiteLocale } from "@/lib/site-locale";
import type { Project } from "@/types/project";
import styles from "./page.module.css";

type IntodayContentProps = {
  project: Project;
  initialLocale?: string;
};

const intodayCopy: Record<
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
    roleLabel: string;
    roleValue: string;
    teamLabel: string;
    teamValue: string;
    problemTitle: string;
    problemBody: string;
    progressTitle: string;
    versionTitle: string;
    versionBody: string;
    versionLinkLabel: string;
    manyMoreTitle: string;
    manyMoreBody: string;
  }
> = {
  en: {
    languageLabel: "Language",
    backToHomeLabel: "Back to home",
    title: "IntoDay",
    summary:
      "A visual workspace for collecting scattered project context and organizing it into reusable packs for AI workflows.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "2026 \u2192 In Progress",
    roleLabel: "Role",
    roleValue: "Product Design / Frontend Development",
    teamLabel: "Team",
    teamValue: "Collaborative Project",
    problemTitle: "Problem",
    problemBody:
      "Project context is often scattered across links, images, PDFs, notes, and different tools. When users need that context again—especially for AI workflows—they have to repeatedly search, upload, and explain the same information.",
    progressTitle: "IntoDay v2 (In Progress)",
    versionTitle: "IntoDay — Current Beta",
    versionBody:
      "The current beta focuses on collecting, organizing, and reusing project context within a visual workspace.",
    versionLinkLabel: "View Live Product",
    manyMoreTitle: "In Progress",
    manyMoreBody:
      "IntoDay is continuously evolving through product testing, design iteration, and frontend development.",
  },
  zh: {
    languageLabel: "语言",
    backToHomeLabel: "返回首页",
    title: "IntoDay",
    summary:
      "用于收集分散的项目上下文并将其组织为可用于 AI 工作流的可复用 Pack 的视觉工作空间。",
    locationLabel: "地点",
    locationValue: "日本东京",
    dateLabel: "日期",
    dateValue: "2026 \u2192 进行中",
    roleLabel: "角色",
    roleValue: "产品设计 / 前端开发",
    teamLabel: "团队",
    teamValue: "合作项目",
    problemTitle: "问题",
    problemBody:
      "项目上下文往往散落在链接、图片、PDF、笔记和不同的工具中。当用户再次需要这些上下文（尤其是用于 AI 工作流）时，必须反复搜索、上传和解释相同的信息。",
    progressTitle: "IntoDay v2（进行中）",
    versionTitle: "IntoDay — Current Beta",
    versionBody:
      "当前的 Beta 版本专注于在视觉工作空间中收集、组织和复用项目上下文。",
    versionLinkLabel: "查看在线产品",
    manyMoreTitle: "进行中",
    manyMoreBody:
      "IntoDay 正通过产品测试、设计迭代和前端开发持续演进。",
  },
  ja: {
    languageLabel: "言語",
    backToHomeLabel: "ホームへ戻る",
    title: "IntoDay",
    summary:
      "散在するプロジェクトのコンテキストを収集し、AIワークフローで再利用可能なパックとして整理するためのビジュアルワークスペース。",
    locationLabel: "場所",
    locationValue: "東京、日本",
    dateLabel: "期間",
    dateValue: "2026 \u2192 進行中",
    roleLabel: "担当",
    roleValue: "プロダクトデザイン / フロントエンド開発",
    teamLabel: "チーム",
    teamValue: "コラボレーションプロジェクト",
    problemTitle: "課題",
    problemBody:
      "プロジェクトのコンテキストは、リンク、画像、PDF、メモ、さまざまなツールに分散しがちです。ユーザーがそのコンテキストを再利用するとき（特にAIワークフローにおいて）、同じ情報を何度も検索、アップロード、説明しなければなりません。",
    progressTitle: "IntoDay v2（進行中）",
    versionTitle: "IntoDay — Current Beta",
    versionBody:
      "現在のベータ版では、ビジュアルワークスペース内でのプロジェクトコンテキストの収集、整理、再利用に焦点を当てています。",
    versionLinkLabel: "ライブプロダクトを見る",
    manyMoreTitle: "進行中",
    manyMoreBody:
      "IntoDay は、プロダクトテスト、デザインイテレーション、フロントエンド開発を通じて継続的に進化しています。",
  },
};

const intodayProgressImages = [
  "/images/projects/intoday/intoday-progress-02.png",
  "/images/projects/intoday/intoday-progress-03.png",
  "/images/projects/intoday/intoday-progress-04.png",
  "/images/projects/intoday/intoday-progress-05.png",
];

export function IntodayContent({
  project,
  initialLocale,
}: IntodayContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<SiteLocale>(() =>
    normalizeLocale(initialLocale),
  );
  const copy = intodayCopy[locale];

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
              src="/images/site/profile-alt.png"
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
            {[
              [copy.locationLabel, copy.locationValue],
              [copy.dateLabel, copy.dateValue],
              [copy.roleLabel, copy.roleValue],
              [copy.teamLabel, copy.teamValue],
            ].map(([label, value]) => (
              <div className={styles.weaveMetaItem} key={label}>
                <dt className={styles.weaveMetaLabel}>{label}</dt>
                <dd className={styles.weaveMetaValue}>{value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.intodayHeroFrame}>
            <Image
              src="/images/projects/intoday/intoday-ver2.png"
              alt="Sogdia visual workspace"
              width={1920}
              height={1248}
              className={styles.intodayHeroImage}
              priority
            />
          </div>

          <section className={styles.intodayProblemSection}>
            <h2 className={styles.weaveResearchTitle}>{copy.problemTitle}</h2>
            <p className={styles.weaveInputBody}>{copy.problemBody}</p>
          </section>

          <h2
            className={`${styles.weaveResearchTitle} ${styles.intodayProgressTitle}`}
          >
            {copy.progressTitle}
          </h2>

          <div className={styles.intodayProgressGallery}>
            {intodayProgressImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Sogdia in-progress exploration ${index + 2}`}
                width={1920}
                height={1248}
                className={styles.intodayProgressImage}
              />
            ))}
          </div>

          <div className={styles.intodayClosingSections}>
            <section className={styles.intodayVersionSection}>
              <h2 className={styles.weaveResearchTitle}>{copy.versionTitle}</h2>
              <p className={styles.weaveInputBody}>{copy.versionBody}</p>
              <a
                className={styles.weavePrototypeLink}
                href="https://intoday.cc"
                target="_blank"
                rel="noreferrer noopener"
              >
                {copy.versionLinkLabel} →
              </a>
            </section>

            <footer
              className={`${styles.goeventFooter} ${styles.weaveFooter} ${styles.intodayFooter}`}
            >
              <h2 className={styles.andManyMoreTitle}>
                {copy.manyMoreTitle}
              </h2>
              <p className={styles.intodayManyMoreBody}>{copy.manyMoreBody}</p>
              <hr className={styles.footerDivider} />
              <Link href={`/?lang=${locale}`} className={styles.footerBackLink}>
                ← {copy.backToHomeLabel}
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
