export type Locale = "en" | "zh" | "ja";

export function normalizeLocale(value?: string): Locale {
  if (value === "zh" || value === "ja" || value === "en") {
    return value;
  }

  return "en";
}

export const localeCopy: Record<
  Locale,
  {
    introLines: string[];
    navItems: Array<{ label: string; href: string }>;
    projectCategories: Record<string, string>;
    audioLabels: {
      idle: string;
      playing: string;
      muted: string;
    };
    notesTitle: string;
  }
> = {
  en: {
    introLines: [
      "Product Designer & Frontend Engineer",
      "I design and build digital products from user problems to working software.",
    ],
    navItems: [
      { label: "Notes", href: "/about" },
      { label: "Work", href: "/projects" },
    ],
    projectCategories: {
      "weave-ai": "Seminar exhibition project",
      goevent: "Product and interaction design case study",
    },
    audioLabels: {
      idle: "Click to listen",
      playing: "Now playing",
      muted: "Muted",
    },
    notesTitle: "Notes",
  },
  zh: {
    introLines: [
      "Product Designer & Frontend Engineer",
      "设计并构建从用户问题到可运行软件的数字产品。",
    ],
    navItems: [
      { label: "笔记", href: "/about" },
      { label: "项目", href: "/projects" },
    ],
    projectCategories: {
      "weave-ai": "研讨会展览项目",
      goevent: "产品与交互设计案例研究",
    },
    audioLabels: {
      idle: "点击聆听",
      playing: "正在播放",
      muted: "已静音",
    },
    notesTitle: "笔记",
  },
  ja: {
    introLines: [
      "Product Designer & Frontend Engineer",
      "ユーザーの課題解決から動作するソフトウェアまで、デジタルプロダクトをデザイン・構築しています。",
    ],
    navItems: [
      { label: "ノート", href: "/about" },
      { label: "制作", href: "/projects" },
    ],
    projectCategories: {
      "weave-ai": "セミナー展示プロジェクト",
      goevent: "プロダクトとインタラクションデザインのケーススタディ",
    },
    audioLabels: {
      idle: "クリックして再生",
      playing: "再生中",
      muted: "ミュート",
    },
    notesTitle: "ノート",
  },
};
