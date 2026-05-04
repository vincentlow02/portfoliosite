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
    inputTitle: string;
    inputBody: string;
    outputTitle: string;
    outputBody: string;
    inputDiagramLabel: string;
    inputAgentLabel: string;
    inputAgentCaption: string;
    inputPastLabel: string;
    inputConstraintsLabel: string;
    inputOptionsLabel: string;
    inputCaption: string;
    outputDiagramLabel: string;
    outputFactorsTitle: string;
    factorBudget: string;
    factorTransport: string;
    factorHotel: string;
    factorGuide: string;
    factorWeather: string;
    factorFood: string;
    outputAgentLabel: string;
    outputVisualsLabel: string;
    outputPill: string;
    outputCaption: string;
    actionTitle: string;
    actionImageAlt: string;
    actionStepVisual: string;
    actionStepMeaning: string;
    actionStepAction: string;
    guideContentCaption: string;
    guideDecisionCaption: string;
    experienceTitle: string;
    mobileTitle: string;
    processTitle: string;
    profileCaption: string;
    savedCaption: string;
    memoryCaption: string;
    mobileCaption: string;
    processCaption: string;
    brandTitle: string;
    brandCaption: string;
    interactiveTitle: string;
    interactiveCaption: string;
    outcomeTitle: string;
    outcomeCaption: string;
    outcomeBody: string;
    outcomeReachLabel: string;
    outcomeReachValue: string;
    outcomeReachUnit: string;
    andManyMoreLabel: string;
    prototypeLinkLabel: string;
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
    inputTitle: "INPUT | Role Division Design to Reduce User Decision Load",
    inputBody:
      "The AI Agent handles the parts that take time to judge, while users only need to express how they feel at the moment.",
    outputTitle: "OUTPUT | Deciding Where to Go Without Comparing",
    outputBody:
      "By presenting options after the AI Agent has already organized the information needed for decision-making, users can choose intuitively instead of comparing.",
    inputDiagramLabel:
      "AI Agent combines past behavior context and current constraints to produce available options now.",
    inputAgentLabel: "AI Agent",
    inputAgentCaption: "Judgment handled",
    inputPastLabel: "Past behavior context",
    inputConstraintsLabel: "Current constraints",
    inputOptionsLabel: "Available options now",
    inputCaption: "Input",
    outputDiagramLabel:
      "Travel decision factors become AI Agent and visuals so users can choose by feeling.",
    outputFactorsTitle: "Factors that used to slow travel decisions",
    factorBudget: "Budget",
    factorTransport: "Transport",
    factorHotel: "Hotel",
    factorGuide: "Guide",
    factorWeather: "Weather",
    factorFood: "Food",
    outputAgentLabel: "AI Agent",
    outputVisualsLabel: "Visuals",
    outputPill: "AI handles judgment. Humans choose by feeling.",
    outputCaption: "Output",
    actionTitle:
      "From Feeling to Action | Designing to Turn the Moment of Feeling into Action",
    actionImageAlt: "A three-step flow from visual attraction to understanding and imagined action.",
    actionStepVisual: "Visually attracted",
    actionStepMeaning: "Meaning becomes clear",
    actionStepAction: "Action becomes imaginable",
    guideContentCaption: "Content Exploration",
    guideDecisionCaption: "Decision Guide",
    experienceTitle: "Experience Design",
    mobileTitle: "Mobile Experience",
    processTitle: "Design Process",
    profileCaption: "Profile",
    savedCaption: "Saved",
    memoryCaption: "Memory",
    mobileCaption: "Mobile Experience",
    processCaption: "Design Process",
    brandTitle: "Brand Identity",
    brandCaption: "Brand Identity",
    interactiveTitle: "Interactive Exhibition Experience (Mobile)",
    interactiveCaption: "Interactive Exhibition Experience",
    outcomeTitle: "Exhibition Outcome",
    outcomeCaption: "Exhibition Outcome",
    outcomeBody:
      "Weave AI was presented as part of the 2025 seminar exhibition, where the concept was translated into an interactive experience that visitors could view and engage with.",
    outcomeReachLabel: "Exhibition Reach",
    outcomeReachValue: "1,000+",
    outcomeReachUnit: "visitors",
    andManyMoreLabel: "And many more...",
    prototypeLinkLabel: "View Interactive Prototype",
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
    inputTitle: "输入 | 通过角色分工降低用户决策负担",
    inputBody:
      "AI 代理处理需要花时间判断的部分，用户只需要表达当下的感受。",
    outputTitle: "输出 | 不再比较，也能决定去哪里",
    outputBody:
      "当 AI 代理已经整理好决策所需的信息后再呈现选项，用户就能凭直觉选择，而不必反复比较。",
    inputDiagramLabel:
      "AI 代理结合过往行为脉络与当前限制条件，生成当下可行选项。",
    inputAgentLabel: "AI 代理",
    inputAgentCaption: "负责判断",
    inputPastLabel: "过往行为脉络",
    inputConstraintsLabel: "当前限制条件",
    inputOptionsLabel: "当下可行选项",
    inputCaption: "输入",
    outputDiagramLabel:
      "旅行决策因素被转化为 AI 代理与影像，让用户凭感受选择。",
    outputFactorsTitle: "过去让旅行决策变慢的因素",
    factorBudget: "预算",
    factorTransport: "交通",
    factorHotel: "酒店",
    factorGuide: "指南",
    factorWeather: "天气",
    factorFood: "餐饮",
    outputAgentLabel: "AI 代理",
    outputVisualsLabel: "影像",
    outputPill: "AI 负责判断，人凭感受选择。",
    outputCaption: "输出",
    actionTitle: "从感受到行动 | 将感受产生的瞬间转化为行动的设计",
    actionImageAlt: "从视觉吸引到理解意义，再到想象行动的三步流程。",
    actionStepVisual: "被视觉吸引",
    actionStepMeaning: "理解其意义",
    actionStepAction: "想象下一步行动",
    guideContentCaption: "内容探索",
    guideDecisionCaption: "决策指南",
    experienceTitle: "体验设计",
    mobileTitle: "移动端体验",
    processTitle: "设计过程",
    profileCaption: "个人资料",
    savedCaption: "收藏",
    memoryCaption: "记忆",
    mobileCaption: "移动端体验",
    processCaption: "设计过程",
    brandTitle: "品牌识别",
    brandCaption: "品牌识别",
    interactiveTitle: "互动展览体验（移动端）",
    interactiveCaption: "互动展览体验",
    outcomeTitle: "展览成果",
    outcomeCaption: "展览成果",
    outcomeBody:
      "Weave AI 作为 2025 年研讨会展览的一部分展出，概念被转化为访客可以观看并参与互动的体验。",
    outcomeReachLabel: "展览触达",
    outcomeReachValue: "1,000+",
    outcomeReachUnit: "名访客",
    andManyMoreLabel: "还有更多...",
    prototypeLinkLabel: "查看互动原型",
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
    inputTitle: "入力 | 役割分担でユーザーの判断負荷を減らす",
    inputBody:
      "AIエージェントが判断に時間のかかる部分を担い、ユーザーはその瞬間の気分を表すだけでよい。",
    outputTitle: "出力 | 比較せずに行き先を決める",
    outputBody:
      "AIエージェントが意思決定に必要な情報を整理したうえで選択肢を提示することで、ユーザーは比較ではなく直感で選べる。",
    inputDiagramLabel:
      "AIエージェントが過去の行動文脈と現在の制約条件を組み合わせ、今行ける選択肢を導く。",
    inputAgentLabel: "AIエージェント",
    inputAgentCaption: "判断を担う",
    inputPastLabel: "過去の行動文脈",
    inputConstraintsLabel: "現在の制約条件",
    inputOptionsLabel: "今行ける選択肢",
    inputCaption: "入力",
    outputDiagramLabel:
      "旅行判断を止めていた要素をAIエージェントと映像に置き換え、感覚で選べるようにする。",
    outputFactorsTitle: "旅先決定を遅らせていた要素",
    factorBudget: "予算",
    factorTransport: "交通",
    factorHotel: "ホテル",
    factorGuide: "ガイド",
    factorWeather: "天気",
    factorFood: "食事",
    outputAgentLabel: "AIエージェント",
    outputVisualsLabel: "映像",
    outputPill: "AIが判断し、人は感覚で選ぶ。",
    outputCaption: "出力",
    actionTitle:
      "感覚から行動へ | 感じた瞬間を行動に変えるためのデザイン",
    actionImageAlt:
      "視覚的な惹かれから意味の理解、行動の想像へ進む三段階の流れ。",
    actionStepVisual: "視覚的に惹かれる",
    actionStepMeaning: "意味が理解できる",
    actionStepAction: "行動を想像できる",
    guideContentCaption: "コンテンツ探索",
    guideDecisionCaption: "意思決定ガイド",
    experienceTitle: "体験設計",
    mobileTitle: "モバイル体験",
    processTitle: "デザインプロセス",
    profileCaption: "プロフィール",
    savedCaption: "保存",
    memoryCaption: "メモリー",
    mobileCaption: "モバイル体験",
    processCaption: "デザインプロセス",
    brandTitle: "ブランドアイデンティティ",
    brandCaption: "ブランドアイデンティティ",
    interactiveTitle: "インタラクティブ展示体験（モバイル）",
    interactiveCaption: "インタラクティブ展示体験",
    outcomeTitle: "展示成果",
    outcomeCaption: "展示成果",
    outcomeBody:
      "Weave AI は 2025 年のセミナー展示の一部として発表され、来場者が見て体験できるインタラクティブな展示へと展開されました。",
    outcomeReachLabel: "展示リーチ",
    outcomeReachValue: "1,000+",
    outcomeReachUnit: "来場者",
    andManyMoreLabel: "And many more...",
    prototypeLinkLabel: "インタラクティブプロトタイプを見る",
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
            <h2 className={`${styles.weaveResearchTitle} ${styles.weaveInputTitle}`}>
              {copy.inputTitle}
            </h2>
            <p className={styles.weaveInputBody}>{copy.inputBody}</p>
            <div
              className={styles.weaveInputDiagram}
              aria-label={copy.inputDiagramLabel}
            >
              <div
                className={`${styles.weaveInputNode} ${styles.weaveInputNodeAgent}`}
              >
                <span>{copy.inputAgentLabel}</span>
                <small>{copy.inputAgentCaption}</small>
              </div>
              <span
                className={`${styles.weaveInputConnector} ${styles.weaveInputTriangle}`}
                aria-hidden="true"
              />
              <div className={styles.weaveInputNode}>
                <span>{copy.inputPastLabel}</span>
              </div>
              <span className={styles.weaveInputPlus} aria-hidden="true">
                +
              </span>
              <div className={styles.weaveInputNode}>
                <span>{copy.inputConstraintsLabel}</span>
              </div>
              <span
                className={`${styles.weaveInputConnector} ${styles.weaveInputArrow}`}
                aria-hidden="true"
              />
              <div
                className={`${styles.weaveInputNode} ${styles.weaveInputNodeOutput}`}
              >
                <span>{copy.inputOptionsLabel}</span>
              </div>
            </div>
            <Image
              src="/images/input-optimized.webp"
              alt=""
              width={2400}
              height={1560}
              className={styles.weaveInputImage}
            />
            <p className={styles.weaveImageCaption}>{copy.inputCaption}</p>
            <h2 className={`${styles.weaveResearchTitle} ${styles.weaveOutputTitle}`}>
              {copy.outputTitle}
            </h2>
            <p className={styles.weaveInputBody}>{copy.outputBody}</p>
            <div
              className={styles.weaveOutputDiagram}
              aria-label={copy.outputDiagramLabel}
            >
              <div className={styles.weaveOutputFactors}>
                <p className={styles.weaveOutputDiagramTitle}>
                  {copy.outputFactorsTitle}
                </p>
                <div className={styles.weaveOutputFactorGrid}>
                  <span
                    className={`${styles.weaveOutputFactor} ${styles.weaveOutputFactorBudget}`}
                  >
                    {copy.factorBudget}
                  </span>
                  <span
                    className={`${styles.weaveOutputFactor} ${styles.weaveOutputFactorTransport}`}
                  >
                    {copy.factorTransport}
                  </span>
                  <span
                    className={`${styles.weaveOutputFactor} ${styles.weaveOutputFactorHotel}`}
                  >
                    {copy.factorHotel}
                  </span>
                  <span
                    className={`${styles.weaveOutputFactor} ${styles.weaveOutputFactorGuide}`}
                  >
                    {copy.factorGuide}
                  </span>
                  <span
                    className={`${styles.weaveOutputFactor} ${styles.weaveOutputFactorWeather}`}
                  >
                    {copy.factorWeather}
                  </span>
                  <span
                    className={`${styles.weaveOutputFactor} ${styles.weaveOutputFactorFood}`}
                  >
                    {copy.factorFood}
                  </span>
                </div>
              </div>
              <span className={styles.weaveOutputTriangle} aria-hidden="true" />
              <div className={styles.weaveOutputResult}>
                <div className={styles.weaveOutputFormula}>
                  <span>{copy.outputAgentLabel}</span>
                  <span className={styles.weaveOutputMultiply}>×</span>
                  <span>{copy.outputVisualsLabel}</span>
                </div>
                <p className={styles.weaveOutputPill}>{copy.outputPill}</p>
              </div>
            </div>
            <Image
              src="/images/output-optimized.webp"
              alt=""
              width={2400}
              height={1560}
              className={styles.weaveOutputImage}
            />
            <p className={styles.weaveImageCaption}>{copy.outputCaption}</p>
            <h2 className={`${styles.weaveResearchTitle} ${styles.weaveActionTitle}`}>
              {copy.actionTitle}
            </h2>
            <div className={styles.weaveActionVisual}>
              <div className={styles.weaveActionImageFrame}>
                <Image
                  src="/images/from.jpg"
                  alt={copy.actionImageAlt}
                  width={1284}
                  height={356}
                  className={styles.weaveActionImage}
                />
              </div>
              <div className={styles.weaveActionLabels}>
                <p>{copy.actionStepVisual}</p>
                <p>{copy.actionStepMeaning}</p>
                <p>{copy.actionStepAction}</p>
              </div>
            </div>
            <div className={styles.weaveGuideGrid}>
              <figure className={styles.weaveGuideCard}>
                <Image
                  src="/images/guide-optimized.webp"
                  alt=""
                  width={1400}
                  height={910}
                  className={styles.weaveGuideImage}
                />
                <figcaption className={styles.weaveImageCaption}>
                  {copy.guideContentCaption}
                </figcaption>
              </figure>
              <figure className={styles.weaveGuideCard}>
                <Image
                  src="/images/guideinside-optimized.webp"
                  alt=""
                  width={1400}
                  height={910}
                  className={styles.weaveGuideImage}
                />
                <figcaption className={styles.weaveImageCaption}>
                  {copy.guideDecisionCaption}
                </figcaption>
              </figure>
            </div>
            <h2
              className={`${styles.weaveResearchTitle} ${styles.weaveExperienceTitle}`}
            >
              {copy.experienceTitle}
            </h2>
            <div className={`${styles.weaveGuideGrid} ${styles.weaveExperienceGrid}`}>
              <figure className={styles.weaveGuideCard}>
                <Image
                  src="/images/profileweave.png"
                  alt=""
                  width={1920}
                  height={1248}
                  className={styles.weaveGuideImage}
                />
                <figcaption className={styles.weaveImageCaption}>
                  {copy.profileCaption}
                </figcaption>
              </figure>
              <figure className={styles.weaveGuideCard}>
                <Image
                  src="/images/savedweave.png"
                  alt=""
                  width={1920}
                  height={1248}
                  className={styles.weaveGuideImage}
                />
                <figcaption className={styles.weaveImageCaption}>
                  {copy.savedCaption}
                </figcaption>
              </figure>
              <figure className={styles.weaveGuideCard}>
                <Image
                  src="/images/memory.png"
                  alt=""
                  width={1920}
                  height={1248}
                  className={styles.weaveGuideImage}
                />
                <figcaption className={styles.weaveImageCaption}>
                  {copy.memoryCaption}
                </figcaption>
              </figure>
            </div>
            <h2
              className={`${styles.weaveResearchTitle} ${styles.weaveMobileTitle}`}
            >
              {copy.mobileTitle}
            </h2>
            <figure className={`${styles.weaveGuideCard} ${styles.weaveMobileFigure}`}>
              <Image
                src="/images/phoneweave-optimized.webp"
                alt=""
                width={7260}
                height={5132}
                className={styles.weaveGuideImage}
              />
              <figcaption className={styles.weaveImageCaption}>
                {copy.mobileCaption}
              </figcaption>
            </figure>
            <h2
              className={`${styles.weaveResearchTitle} ${styles.weaveProcessTitle}`}
            >
              {copy.processTitle}
            </h2>
            <figure className={`${styles.weaveGuideCard} ${styles.weaveMobileFigure}`}>
              <Image
                src="/images/weaveprocess-optimized.webp"
                alt=""
                width={7260}
                height={5132}
                className={styles.weaveGuideImage}
              />
              <figcaption className={styles.weaveImageCaption}>
                {copy.processCaption}
              </figcaption>
            </figure>
            <h2
              className={`${styles.weaveResearchTitle} ${styles.weaveBrandTitle}`}
            >
              {copy.brandTitle}
            </h2>
            <figure className={`${styles.weaveGuideCard} ${styles.weaveMobileFigure}`}>
              <Image
                src="/images/branding-optimized.webp"
                alt=""
                width={1981}
                height={794}
                className={styles.weaveGuideImage}
              />
              <figcaption className={styles.weaveImageCaption}>
                {copy.brandCaption}
              </figcaption>
            </figure>
            <h2
              className={`${styles.weaveResearchTitle} ${styles.weaveInteractiveTitle}`}
            >
              {copy.interactiveTitle}
            </h2>
            <figure className={`${styles.weaveGuideCard} ${styles.weaveMobileFigure}`}>
              <Image
                src="/images/exhibit-optimized.webp"
                alt=""
                width={5984}
                height={6432}
                className={styles.weaveGuideImage}
              />
              <figcaption className={styles.weaveImageCaption}>
                {copy.interactiveCaption}
              </figcaption>
            </figure>
            <a
              className={styles.weavePrototypeLink}
              href="https://vincentlow02.github.io/Seminarapp-/"
              target="_blank"
              rel="noreferrer"
            >
              {copy.prototypeLinkLabel}
            </a>
            <figure className={`${styles.weaveGuideCard} ${styles.weaveMobileFigure}`}>
              <Image
                src="/images/exhibitresult-crop-optimized.webp"
                alt=""
                width={7264}
                height={4140}
                className={styles.weaveGuideImage}
              />
              <figcaption className={styles.weaveImageCaption}>
                {copy.outcomeCaption}
              </figcaption>
            </figure>
            <section
              className={styles.weaveOutcomePanel}
              aria-label={copy.outcomeTitle}
            >
              <div className={styles.weaveOutcomeCopy}>
                <h2 className={styles.weaveOutcomePanelTitle}>
                  {copy.outcomeTitle}
                </h2>
                <p className={styles.weaveOutcomePanelBody}>
                  {copy.outcomeBody}
                </p>
              </div>
              <div className={styles.weaveOutcomeReach}>
                <p className={styles.weaveOutcomeReachLabel}>
                  {copy.outcomeReachLabel}
                </p>
                <p className={styles.weaveOutcomeReachValue}>
                  <span>{copy.outcomeReachValue}</span> {copy.outcomeReachUnit}
                </p>
              </div>
            </section>
            <footer className={`${styles.goeventFooter} ${styles.weaveFooter}`}>
              <h2 className={styles.andManyMoreTitle}>
                {copy.andManyMoreLabel}
              </h2>
              <hr className={styles.footerDivider} />
              <Link href={`/?lang=${locale}`} className={styles.footerBackLink}>
                ← {copy.backToHomeLabel}
              </Link>
            </footer>
          </section>
        </div>
      </div>
    </article>
  );
}
