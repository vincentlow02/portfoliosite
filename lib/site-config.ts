const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteConfig = {
  name: "Vincent Low",
  description:
    "Product designer based in Japan, focused on creating clear and intuitive experiences for everyday life.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000"),
  navItems: [
    { label: "Home", href: "/" },
    { label: "Notes", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Atmosphere", href: "/atmosphere" },
  ],
} as const;
