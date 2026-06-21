export const siteConfig = {
  name: "Vincent Low",
  description:
    "Product designer based in Japan, focused on creating clear and intuitive experiences for everyday life.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "Atmosphere", href: "/atmosphere" },
  ],
} as const;
