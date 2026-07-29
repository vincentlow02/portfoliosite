import Link from "next/link";
import type { Locale as SiteLocale } from "@/lib/site-locale";
import styles from "./page.module.css";

const NOTES_COPY: Record<
  SiteLocale,
  {
    title: string;
    date: string;
    articleTitle: string;
    excerpt: string;
    lang: string;
  }
> = {
  en: {
    title: "Notes",
    date: "July 28, 2026",
    articleTitle: "What I Learned Designing My First AI Agent",
    excerpt:
      "Practical insights from a designer’s experience building an AI agent product—from defining user outcomes and agent workflows to translating complex AI processes into clear, understandable product experiences.",
    lang: "en",
  },
  zh: {
    title: "笔记",
    date: "2026年7月28日",
    articleTitle: "设计第一个 AI Agent 时学到的事",
    excerpt:
      "一位设计师关于定义用户目标、设计 Agent 工作流程，以及将复杂的 AI 过程转化为清晰易懂产品体验的思考。",
    lang: "zh-CN",
  },
  ja: {
    title: "ノート",
    date: "2026年7月28日",
    articleTitle: "初めてのAIエージェント設計から学んだこと",
    excerpt:
      "ユーザーの目標設定、エージェントのワークフロー設計、そして複雑なAIプロセスを明快で理解しやすいプロダクト体験へ変換することについての、デザイナーとしての振り返り。",
    lang: "ja",
  },
};

type AboutContentProps = {
  locale: SiteLocale;
};

export function AboutContent({ locale }: AboutContentProps) {
  const copy = NOTES_COPY[locale];

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <header className={styles.header}>
          <Link href={`/?lang=${locale}`} className={styles.nameLink}>
            VL
          </Link>
          <nav className={styles.nav} aria-label={copy.title}>
            <span aria-current="page">{copy.title}</span>
          </nav>
        </header>

        <section className={styles.notes} aria-labelledby="notes-title">
          <h1 id="notes-title" className={styles.title}>
            {copy.title}
          </h1>

          <article className={styles.note}>
            <time className={styles.date} dateTime="2026-07-28">
              {copy.date}
            </time>
            <a
              href="https://note.com/vincentlow/n/nafc5e5d3a3a6?app_launch=false"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.noteTitle}
              lang={copy.lang}
            >
              {copy.articleTitle}
            </a>
            <p className={styles.excerpt} lang={copy.lang}>
              {copy.excerpt}
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
