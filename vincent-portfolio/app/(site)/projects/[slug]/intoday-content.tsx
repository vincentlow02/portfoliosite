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
      "IntoDay is a visual workspace that keeps collected context together, helping users turn scattered resources into structured, shareable, and reusable knowledge.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "2026 \u2192 In Progress",
    roleLabel: "Role",
    roleValue:
      "Product Strategy / UX/UI Design / Branding / Front-end Development",
    problemTitle: "Problem",
    problemBody:
      "During school research and creative projects, people collect links, images, PDFs, and notes across different tools, but the context often becomes fragmented and hard to reuse.",
    progressTitle: "IntoDay v2 (In Progress)",
    versionTitle: "IntoDay Ver.1",
    versionBody:
      "The first public version of IntoDay, focusing on collecting and organizing digital context into a visual workspace.",
    versionLinkLabel: "View IntoDay",
    manyMoreTitle: "And many more...",
    manyMoreBody:
      "IntoDay is continuously evolving through ongoing design iterations and feature improvements. More updates and experiments are coming soon.",
  },
  zh: {
    languageLabel: "语言",
    backToHomeLabel: "返回首页",
    title: "IntoDay",
    summary:
      "IntoDay 是一个视觉化工作空间，将收集到的背景资料集中整理，帮助用户把零散资源转化为结构清晰、可分享且可重复使用的知识。",
    locationLabel: "地点",
    locationValue: "日本东京",
    dateLabel: "日期",
    dateValue: "2026 \u2192 进行中",
    roleLabel: "角色",
    roleValue: "产品策略 / UX/UI 设计 / 品牌设计 / 前端开发",
    problemTitle: "问题",
    problemBody:
      "在学校研究与创意项目中，人们会使用不同工具收集链接、图片、PDF 和笔记，但这些资料的背景脉络往往变得零散，难以再次利用。",
    progressTitle: "IntoDay v2（进行中）",
    versionTitle: "IntoDay Ver.1",
    versionBody:
      "IntoDay 的首个公开版本，专注于收集并整理数字内容，将其组织成一个视觉化工作空间。",
    versionLinkLabel: "查看 IntoDay",
    manyMoreTitle: "还有更多...",
    manyMoreBody:
      "IntoDay 正通过持续的设计迭代与功能改进不断发展。更多更新与实验即将推出。",
  },
  ja: {
    languageLabel: "言語",
    backToHomeLabel: "ホームへ戻る",
    title: "IntoDay",
    summary:
      "IntoDay は、収集したコンテキストをひとつにまとめ、散在するリソースを構造化され、共有・再利用できる知識へ変えるビジュアルワークスペースです。",
    locationLabel: "場所",
    locationValue: "東京、日本",
    dateLabel: "期間",
    dateValue: "2026 \u2192 進行中",
    roleLabel: "担当",
    roleValue:
      "プロダクト戦略 / UX/UI デザイン / ブランディング / フロントエンド開発",
    problemTitle: "課題",
    problemBody:
      "学校でのリサーチやクリエイティブプロジェクトでは、リンク、画像、PDF、メモを複数のツールに集めますが、文脈が分散し、再利用しにくくなりがちです。",
    progressTitle: "IntoDay v2（進行中）",
    versionTitle: "IntoDay Ver.1",
    versionBody:
      "IntoDay の最初の公開バージョン。デジタルコンテキストを収集・整理し、ビジュアルワークスペースへまとめることに焦点を当てました。",
    versionLinkLabel: "IntoDay を見る",
    manyMoreTitle: "And many more...",
    manyMoreBody:
      "IntoDay は、継続的なデザインの反復と機能改善を通じて進化しています。今後もアップデートや新しい実験を公開していきます。",
  },
};

const intodayProgressImages = [
  "/images/intoday-progress-02.png",
  "/images/intoday-progress-03.png",
  "/images/intoday-progress-04.png",
  "/images/intoday-progress-05.png",
  "/images/intoday-progress-06.png",
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
            {[
              [copy.locationLabel, copy.locationValue],
              [copy.dateLabel, copy.dateValue],
              [copy.roleLabel, copy.roleValue],
            ].map(([label, value]) => (
              <div className={styles.weaveMetaItem} key={label}>
                <dt className={styles.weaveMetaLabel}>{label}</dt>
                <dd className={styles.weaveMetaValue}>{value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.intodayHeroFrame}>
            <Image
              src="/images/intoday-ver2.png"
              alt="IntoDay visual workspace"
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
                alt={`IntoDay in-progress exploration ${index + 2}`}
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
