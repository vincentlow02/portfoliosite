import type { Locale as SiteLocale } from "@/lib/site-locale";

export type GoEventLocaleCopy = {
  summary: string;
  locationLabel: string;
  locationValue: string;
  dateLabel: string;
  dateValue: string;
  briefTitle: string;
  briefCopy: string;
  researchTitle: string;
  researchCopy: string;
  interviewSectionTitle: string;
  interviewTitle: string;
  interviewCopy: string;
  challengeImageAlt: string;
  personaTitle: string;
  personaName: string;
  personaDetails: [string, string];
  cjmTitle: string;
  cjmSubtitle: string;
  cjmStages: [
    { label: string; copy: string },
    { label: string; copy: string },
    { label: string; copy: string },
  ];
  designSolutionTitle: string;
  designSolutionSteps: [
    {
      overlayLabel: string;
      imageSrc: string;
      visualClass: string;
      imageClass: string;
      alt: string;
    },
    {
      overlayLabel: string;
      imageSrc: string;
      visualClass: string;
      imageClass: string;
      alt: string;
    },
    {
      overlayLabel: string;
      imageSrc: string;
      visualClass: string;
      imageClass: string;
      alt: string;
    },
  ];
  quotes: [string, string, string];
};

export const goeventLocaleCopy: Record<SiteLocale, GoEventLocaleCopy> = {
  en: {
    summary:
      "GoEvent is a concept mobile app that helps people discover and join nearby events whenever inspiration strikes.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "June 2025 → July 2025",
    briefTitle: "Project brief",
    briefCopy:
      "In Tokyo, deciding whether to attend an event still feels difficult because event discovery and ticketing happen across different platforms.",
    researchTitle: "Online Research",
    researchCopy:
      "Online research showed that 44% of users decide whether to attend based on social content, 53% spend more than 30 minutes deciding whether to go, and 88% consider reviews and atmosphere before attending. This suggested that the real challenge was not a lack of information, but knowing whether an event felt worth attending.",
    interviewSectionTitle: "User Interview",
    interviewTitle: "Challenge",
    interviewCopy:
      "Across interviews, users were not struggling to find events — they were struggling to judge whether an event fit their current situation.",
    challengeImageAlt: "Interview participant portrait",
    personaTitle: "Persona",
    personaName: "Mayu, 24",
    personaDetails: [
      "Often feels uncertain when deciding where to go during weekend walks.",
      "Needs quick clarity on whether an event fits her time, distance, and mood.",
    ],
    cjmTitle: "CJM",
    cjmSubtitle: "A simplified journey from hesitation to confident action.",
    cjmStages: [
      {
        label: "Before use",
        copy: "Fragmented information made event decisions feel tiring.",
      },
      {
        label: "During use",
        copy: "Only relevant “go-now” events were surfaced, making judgment easier.",
      },
      {
        label: "After use",
        copy: "The user could move into action with more confidence.",
      },
    ],
    designSolutionTitle: "Design solution:\nBrowse Less, Decide Faster",
    designSolutionSteps: [
      {
        overlayLabel: "Signin",
        imageSrc: "/images/goevent-solution-signin.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent sign in screen concept",
      },
      {
        overlayLabel: "Home",
        imageSrc: "/images/goevent-solution-home.png",
        visualClass: "goeventSolutionVisualWide",
        imageClass: "goeventSolutionImageContain",
        alt: "GoEvent home screen concept",
      },
      {
        overlayLabel: "Discover",
        imageSrc: "/images/goevent-solution-discover.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent discover screen concept",
      },
    ],
    quotes: [
      "I can find events, but I can't tell right away if one fits today. 🤔",
      "Usually compares events across multiple platforms before deciding “Too much comparison slows down action.” 🤔",
      "“I keep checking different places before I decide to go.” 🤦🏻‍♀️",
    ],
  },
  zh: {
    summary:
      "GoEvent 是一款概念型移动应用，帮助人们在灵感出现时发现并加入附近的活动。",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "2025年6月 → 2025年7月",
    briefTitle: "项目简介",
    briefCopy:
      "在东京，决定是否去参加一个活动依然很困难，因为活动发现与购票分散在不同平台上。",
    researchTitle: "线上调研",
    researchCopy:
      "线上调研显示，44% 的用户会根据社交内容决定是否参加活动，53% 的用户会花超过 30 分钟来决定是否要去，而 88% 的用户在参加前会查看评价和现场氛围。这说明真正的问题并不是信息不足，而是不容易判断一个活动是否值得去。",
    interviewSectionTitle: "用户访谈",
    interviewTitle: "挑战",
    interviewCopy:
      "在多次访谈中，用户真正困难的不是找不到活动，而是难以判断一个活动是否符合自己当下的情况与状态。",
    challengeImageAlt: "受访者照片",
    personaTitle: "人物画像",
    personaName: "Mayu，24 岁",
    personaDetails: [
      "周末散步时，她常常不确定自己该去哪里。",
      "她需要快速判断一个活动是否符合自己的时间、距离与当下心情。",
    ],
    cjmTitle: "CJM",
    cjmSubtitle: "将犹豫转为行动的简化旅程。",
    cjmStages: [
      {
        label: "使用前",
        copy: "分散的信息让活动决策过程变得疲惫而低效。",
      },
      {
        label: "使用中",
        copy: "系统只呈现真正适合“现在就去”的活动，让判断更轻松。",
      },
      {
        label: "使用后",
        copy: "用户能够更有把握地做出行动决定。",
      },
    ],
    designSolutionTitle: "Design solution:\nBrowse Less, Decide Faster",
    designSolutionSteps: [
      {
        overlayLabel: "Signin",
        imageSrc: "/images/goevent-solution-signin.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent 登录入口界面",
      },
      {
        overlayLabel: "Home",
        imageSrc: "/images/goevent-solution-home.png",
        visualClass: "goeventSolutionVisualWide",
        imageClass: "goeventSolutionImageContain",
        alt: "GoEvent 首页概念界面",
      },
      {
        overlayLabel: "Discover",
        imageSrc: "/images/goevent-solution-discover.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent 发现页概念界面",
      },
    ],
    quotes: [
      "我能找到活动，但没办法立刻判断它是不是适合今天去。🤔",
      "我通常会在多个平台之间反复比较活动，“比较太多反而拖慢了行动。” 🤔",
      "“我总是要到处看一遍，才决定要不要去。” 🤦🏻‍♀️",
    ],
  },
  ja: {
    summary:
      "GoEvent は、気分が向いたときに近くのイベントを見つけて参加できるようにするコンセプトモバイルアプリです。",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "2025年6月 → 2025年7月",
    briefTitle: "プロジェクト概要",
    briefCopy:
      "東京では、イベントを見つけることはできても、発見とチケット購入が別々のプラットフォームに分かれているため、参加するかどうかの判断がまだ難しいままです。",
    researchTitle: "オンライン調査",
    researchCopy:
      "オンライン調査では、44% のユーザーが SNS 上の内容をもとに参加を判断し、53% が参加するか決めるまでに 30 分以上かけ、88% が参加前にレビューや雰囲気を確認していることが分かりました。つまり、本当の課題は情報不足ではなく、そのイベントが行く価値のあるものかどうかを判断しにくいことでした。",
    interviewSectionTitle: "ユーザーインタビュー",
    interviewTitle: "課題",
    interviewCopy:
      "複数のインタビューを通じて分かったのは、ユーザーが困っていたのはイベントを見つけることではなく、そのイベントが今の自分の状況に合っているか判断することでした。",
    challengeImageAlt: "インタビュー参加者のポートレート",
    personaTitle: "ペルソナ",
    personaName: "Mayu、24歳",
    personaDetails: [
      "週末の散歩中、どこへ行くべきか迷うことが多い。",
      "イベントが自分の時間、距離感、気分に合っているかをすぐに判断したい。",
    ],
    cjmTitle: "CJM",
    cjmSubtitle: "迷いから行動へ移るまでのシンプルなジャーニー。",
    cjmStages: [
      {
        label: "使用前",
        copy: "情報が分散していて、イベントを決めること自体が負担になっていた。",
      },
      {
        label: "使用中",
        copy: "“今行ける”関連イベントだけが表示され、判断しやすくなった。",
      },
      {
        label: "使用後",
        copy: "ユーザーはより自信を持って次の行動に移れるようになった。",
      },
    ],
    designSolutionTitle: "Design solution:\nBrowse Less, Decide Faster",
    designSolutionSteps: [
      {
        overlayLabel: "Signin",
        imageSrc: "/images/goevent-solution-signin.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent サインイン画面コンセプト",
      },
      {
        overlayLabel: "Home",
        imageSrc: "/images/goevent-solution-home.png",
        visualClass: "goeventSolutionVisualWide",
        imageClass: "goeventSolutionImageContain",
        alt: "GoEvent ホーム画面コンセプト",
      },
      {
        overlayLabel: "Discover",
        imageSrc: "/images/goevent-solution-discover.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent ディスカバー画面コンセプト",
      },
    ],
    quotes: [
      "イベントは見つかるけれど、今日の自分に合うかどうかはすぐに分からない。🤔",
      "参加を決める前に複数のプラットフォームで比較してしまう。「比較しすぎると行動が遅くなる。」 🤔",
      "「行くと決める前に、いろいろな場所を何度も見てしまう。」 🤦🏻‍♀️",
    ],
  },
};
