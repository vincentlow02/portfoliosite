import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: "/images/site/sitelogo.png", type: "image/jpeg" },
    ],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifJp.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/images/site/home-portrait.png" />
        <link rel="preload" as="image" href="/images/site/profile-alt.png" />
        <link rel="preload" as="image" href="/images/site/email.png" />
        <link rel="preload" as="image" href="/images/site/x.png" />
        <link rel="preload" as="image" href="/images/site/instagram.png" />
        <link rel="preload" as="image" href="/images/site/github.png" />
        <link rel="preload" as="image" href="/images/site/linkedin.png" />
        <link rel="icon" href="/images/site/sitelog.jpg" type="image/jpeg" sizes="any" />
        <link rel="shortcut icon" href="/images/site/sitelog.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/site/sitelog.jpg" />
      </head>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
