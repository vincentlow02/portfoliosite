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
    aboutTitle: string;
    aboutParagraphs: string[];
    connectTitle: string;
    connectLabel: string;
    contactLabels: Record<"email" | "x" | "ins" | "github" | "linkedin", string>;
  }
> = {
  en: {
    introLines: [
      "Product designer based in Japan.",
      "Focused on creating clear, intuitive experiences for everyday life.",
    ],
    navItems: [
      { label: "About", href: "/about" },
      { label: "Connect", href: "/contact" },
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
    aboutTitle: "About",
    aboutParagraphs: [
      "I'm Vincent Low Sik Ching, an Industrial Design student at Tokyo Zokei University from Johor Bahru, Malaysia. I'm interested in the intersection of technology and design.",
      "My work explores how design can shape people's actions and create experiences that feel natural, intuitive, and closely integrated into everyday life.",
      "I'm driven by curiosity and always strive for a high level of craftsmanship and refinement in my work.",
    ],
    connectTitle: "Connect",
    connectLabel: "Connect",
    contactLabels: {
      email: "Email",
      x: "X",
      ins: "Ins",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
  zh: {
    introLines: [
      "常驻日本的产品设计师。",
      "专注于为日常生活打造清晰、直觉的体验。",
    ],
    navItems: [
      { label: "关于", href: "/about" },
      { label: "联系", href: "/contact" },
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
    aboutTitle: "关于",
    aboutParagraphs: [
      "我是 Vincent Low Sik Ching，来自马来西亚新山，目前就读于东京造形大学工业设计专业。我对科技与设计的交汇很感兴趣。",
      "我的创作关注设计如何塑造人的行为，并创造出自然、直觉且紧密融入日常生活的体验。",
      "我始终由好奇心驱动，也不断追求更高水平的工艺、完成度与细节打磨。",
    ],
    connectTitle: "联系",
    connectLabel: "联系",
    contactLabels: {
      email: "邮箱",
      x: "X",
      ins: "Ins",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
  ja: {
    introLines: [
      "日本を拠点に活動するプロダクトデザイナー。",
      "日常に寄り添う、明快で直感的な体験づくりに取り組んでいます。",
    ],
    navItems: [
      { label: "概要", href: "/about" },
      { label: "連絡", href: "/contact" },
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
    aboutTitle: "概要",
    aboutParagraphs: [
      "私は Vincent Low Sik Ching です。マレーシアのジョホールバル出身で、東京造形大学でインダストリアルデザインを学んでいます。テクノロジーとデザインの交差点に関心があります。",
      "私の制作では、デザインが人の行動をどう形づくるか、そして日常に自然に溶け込み、直感的に使える体験をどう生み出せるかを探っています。",
      "好奇心を原動力に、常に高い完成度とクラフトの質、細部の洗練を目指しています。",
    ],
    connectTitle: "連絡",
    connectLabel: "連絡",
    contactLabels: {
      email: "メール",
      x: "X",
      ins: "Ins",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
};
