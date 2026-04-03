export const siteConfig = {
  name: "Vincent Portfolio",
  description:
    "A minimal portfolio starter focused on maintainable routing, typed content, and reusable scaffolding.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
