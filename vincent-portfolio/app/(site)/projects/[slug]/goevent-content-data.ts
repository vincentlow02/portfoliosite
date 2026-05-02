import type { Locale as SiteLocale } from "@/lib/site-locale";

export type GoEventDetailImage = {
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  headline?: string;
  titlePosition?: "top" | "bottom";
  detailImages?: GoEventDetailImage[];
};

type GoEventSolutionStep = {
  overlayLabel: string;
  imageSrc: string;
  visualClass: string;
  imageClass: string;
  alt: string;
  headline?: string;
  detailImages?: GoEventDetailImage[];
};

export type GoEventLocaleCopy = {
  languageLabel: string;
  backToHomeLabel: string;
  avatarAlt: string;
  heroImageAlt: string;
  summary: string;
  locationLabel: string;
  locationValue: string;
  dateLabel: string;
  dateValue: string;
  processSectionTitle: string;
  processCardTitle: string;
  processCardPreview: string;
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
    GoEventSolutionStep,
    GoEventSolutionStep,
    GoEventSolutionStep,
  ];
  quotes: [string, string, string];
  andManyMoreLabel: string;
};

export const goeventLocaleCopy: Record<SiteLocale, GoEventLocaleCopy> = {
  en: {
    languageLabel: "Language",
    backToHomeLabel: "Back to home",
    avatarAlt: "GoEvent avatar",
    heroImageAlt: "GoEvent app preview",
    summary:
      "GoEvent is a concept mobile app that helps people discover and join nearby events whenever inspiration strikes.",
    locationLabel: "Location",
    locationValue: "Tokyo, Japan",
    dateLabel: "Date",
    dateValue: "June 2025 → July 2025",
    processSectionTitle: "Design process",
    processCardTitle: "Project brief → CJM",
    processCardPreview:
      "View the full process from project brief, research, and user interview through challenge, persona, and journey map.",
    briefTitle: "Project brief",
    briefCopy:
      "In Tokyo, deciding whether to attend an event still feels difficult because event discovery and ticketing happen across different platforms.",
    researchTitle: "Online Research",
    researchCopy:
      "Online research showed that 44% of users decide whether to attend based on social content, 53% spend more than 30 minutes deciding whether to go, and 88% consider reviews and atmosphere before attending. This suggested that the real challenge was not a lack of information, but knowing whether an event felt worth attending.",
    interviewSectionTitle: "User Interview",
    interviewTitle: "Challenge",
    interviewCopy:
      "Across interviews, users were not struggling to find events. They were struggling to judge whether an event fit their current situation.",
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
        copy: 'Only relevant "go-now" events were surfaced, making judgment easier.',
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
        headline: 'Designed for "go now" judgement',
        detailImages: [
          {
            label: "Event detail",
            src: "/images/goevent-solution-eventdetail.png",
            alt: "GoEvent event detail screen",
            width: 1608,
            height: 3496,
          },
          {
            label: "Ticket booking",
            src: "/images/goevent-solution-ticketbooking.png",
            alt: "GoEvent ticket booking screen",
            width: 1608,
            height: 3496,
          },
          {
            label: "Saved",
            src: "/images/goevent-solution-saved.png",
            alt: "GoEvent saved screen",
            width: 1608,
            height: 3496,
            headline: "Designing for continued use beyond a single event",
            detailImages: [
              {
                label: "Search",
                src: "/images/goevent-solution-search.png",
                alt: "GoEvent search screen",
                width: 1608,
                height: 3496,
              },
              {
                label: "Ticket",
                src: "/images/goevent-solution-ticket.png",
                alt: "GoEvent ticket screen",
                width: 1608,
                height: 3496,
              },
              {
                label: "Profile",
                src: "/images/goevent-solution-profile.png",
                alt: "GoEvent profile screen",
                width: 1608,
                height: 3496,
              },
              {
                label: "Visual Identity",
                src: "/images/design-optimized.webp",
                alt: "GoEvent Visual Identity",
                width: 2200,
                height: 1148,
                titlePosition: "top",
              },
              {
                label: "Platforms Showcase",
                src: "/images/last-optimized.webp",
                alt: "GoEvent platforms showcase",
                width: 2200,
                height: 1085,
              },
            ],
          },
        ],
      },
    ],
    quotes: [
      "I can find events, but I can't tell right away if one fits today.",
      "I usually compare events across multiple platforms before deciding. \"Too much comparison slows down action.\"",
      '"I keep checking different places before I decide to go."',
    ],
    andManyMoreLabel: "And many more...",
  },
  zh: {
    languageLabel: "语言",
    backToHomeLabel: "返回首页",
    avatarAlt: "GoEvent 头像",
    heroImageAlt: "GoEvent 应用预览",
    summary:
      "GoEvent 是一款概念型移动应用，帮助人们在灵感出现时发现并加入附近的活动。",
    locationLabel: "地点",
    locationValue: "东京，日本",
    dateLabel: "日期",
    dateValue: "2025年6月 → 2025年7月",
    processSectionTitle: "设计过程",
    processCardTitle: "项目简介 → CJM",
    processCardPreview:
      "查看从项目简介、调研与用户访谈，到挑战、人物画像和旅程地图的完整过程。",
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
    designSolutionTitle: "设计方案：\n少一点浏览，更快做决定",
    designSolutionSteps: [
      {
        overlayLabel: "登录",
        imageSrc: "/images/goevent-solution-signin.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent 登录界面概念图",
      },
      {
        overlayLabel: "首页",
        imageSrc: "/images/goevent-solution-home.png",
        visualClass: "goeventSolutionVisualWide",
        imageClass: "goeventSolutionImageContain",
        alt: "GoEvent 首页概念图",
      },
      {
        overlayLabel: "发现",
        imageSrc: "/images/goevent-solution-discover.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent 发现页概念图",
        headline: "为“现在就去”的判断而设计",
        detailImages: [
          {
            label: "活动详情",
            src: "/images/goevent-solution-eventdetail.png",
            alt: "GoEvent 活动详情界面",
            width: 1608,
            height: 3496,
          },
          {
            label: "票券预订",
            src: "/images/goevent-solution-ticketbooking.png",
            alt: "GoEvent 票券预订界面",
            width: 1608,
            height: 3496,
          },
          {
            label: "收藏",
            src: "/images/goevent-solution-saved.png",
            alt: "GoEvent 收藏界面",
            width: 1608,
            height: 3496,
            headline: "为单次活动之后的持续使用而设计",
            detailImages: [
              {
                label: "搜索",
                src: "/images/goevent-solution-search.png",
                alt: "GoEvent 搜索界面",
                width: 1608,
                height: 3496,
              },
              {
                label: "票券",
                src: "/images/goevent-solution-ticket.png",
                alt: "GoEvent 票券界面",
                width: 1608,
                height: 3496,
              },
              {
                label: "个人资料",
                src: "/images/goevent-solution-profile.png",
                alt: "GoEvent 个人资料界面",
                width: 1608,
                height: 3496,
              },
              {
                label: "视觉识别系统",
                src: "/images/design-optimized.webp",
                alt: "GoEvent 视觉识别系统",
                width: 2200,
                height: 1148,
                titlePosition: "top",
              },
              {
                label: "全平台展示",
                src: "/images/last-optimized.webp",
                alt: "GoEvent 全平台展示",
                width: 2200,
                height: 1085,
              },
            ],
          },
        ],
      },
    ],
    quotes: [
      "我能找到活动，但没办法立刻判断它适不适合今天去。",
      "我通常会在多个平台之间反复比较活动，“比较太多反而拖慢了行动。”",
      "“我总是要到处看一遍，才决定要不要去。”",
    ],
    andManyMoreLabel: "以及更多...",
  },
  ja: {
    languageLabel: "言語",
    backToHomeLabel: "ホームに戻る",
    avatarAlt: "GoEvent アバター",
    heroImageAlt: "GoEvent アプリプレビュー",
    summary:
      "GoEvent は、気分が向いたときに近くのイベントを見つけて参加できるようにするコンセプトモバイルアプリです。",
    locationLabel: "場所",
    locationValue: "東京、日本",
    dateLabel: "日付",
    dateValue: "2025年6月 → 2025年7月",
    processSectionTitle: "デザインプロセス",
    processCardTitle: "プロジェクト概要 → CJM",
    processCardPreview:
      "プロジェクト概要、リサーチ、ユーザーインタビューから、課題、ペルソナ、ジャーニーマップまでの全プロセスを見る。",
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
        copy: "「今行ける」関連イベントだけが表示され、判断しやすくなった。",
      },
      {
        label: "使用後",
        copy: "ユーザーはより自信を持って次の行動に移れるようになった。",
      },
    ],
    designSolutionTitle: "デザインソリューション：\n探す時間を減らし、早く決める",
    designSolutionSteps: [
      {
        overlayLabel: "サインイン",
        imageSrc: "/images/goevent-solution-signin.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent サインイン画面コンセプト",
      },
      {
        overlayLabel: "ホーム",
        imageSrc: "/images/goevent-solution-home.png",
        visualClass: "goeventSolutionVisualWide",
        imageClass: "goeventSolutionImageContain",
        alt: "GoEvent ホーム画面コンセプト",
      },
      {
        overlayLabel: "発見",
        imageSrc: "/images/goevent-solution-discover.png",
        visualClass: "goeventSolutionVisualTall",
        imageClass: "goeventSolutionImagePhone",
        alt: "GoEvent ディスカバー画面コンセプト",
        headline: "「今行けるか」を判断しやすくする設計",
        detailImages: [
          {
            label: "イベント詳細",
            src: "/images/goevent-solution-eventdetail.png",
            alt: "GoEvent イベント詳細画面",
            width: 1608,
            height: 3496,
          },
          {
            label: "チケット予約",
            src: "/images/goevent-solution-ticketbooking.png",
            alt: "GoEvent チケット予約画面",
            width: 1608,
            height: 3496,
          },
          {
            label: "保存済み",
            src: "/images/goevent-solution-saved.png",
            alt: "GoEvent 保存済み画面",
            width: 1608,
            height: 3496,
            headline: "単発のイベント後も使い続けられるように設計",
            detailImages: [
              {
                label: "検索",
                src: "/images/goevent-solution-search.png",
                alt: "GoEvent 検索画面",
                width: 1608,
                height: 3496,
              },
              {
                label: "チケット",
                src: "/images/goevent-solution-ticket.png",
                alt: "GoEvent チケット画面",
                width: 1608,
                height: 3496,
              },
              {
                label: "プロフィール",
                src: "/images/goevent-solution-profile.png",
                alt: "GoEvent プロフィール画面",
                width: 1608,
                height: 3496,
              },
              {
                label: "ブランド・アイデンティティ",
                src: "/images/design-optimized.webp",
                alt: "GoEvent ブランド・アイデンティティ",
                width: 2200,
                height: 1148,
                titlePosition: "top",
              },
              {
                label: "プラットフォーム・ショーケース",
                src: "/images/last-optimized.webp",
                alt: "GoEvent プラットフォーム・ショーケース",
                width: 2200,
                height: 1085,
              },
            ],
          },
        ],
      },
    ],
    quotes: [
      "イベントは見つかるけれど、今日の自分に合うかどうかはすぐに分からない。",
      "参加を決める前に複数のプラットフォームで比較してしまう。「比較しすぎると行動が遅くなる。」",
      "「行くと決める前に、いろいろな場所を何度も見てしまう。」",
    ],
    andManyMoreLabel: "などなど...",
  },
};
