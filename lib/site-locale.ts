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
      "Product designer from Malaysia, based in Tokyo.",
      "I design and build clear, intuitive AI products and digital experiences.",
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
      "来自马来西亚、现居东京的产品设计师。",
      "设计并构建清晰、直觉的 AI 产品与数字体验。",
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
      "マレーシア出身、東京を拠点に活動するプロダクトデザイナー。",
      "明快で直感的なAIプロダクトとデジタル体験をデザインしています。",
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
