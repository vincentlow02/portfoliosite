"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isProjectDetail = /^\/projects\/[^/]+(?:\/process)?$/.test(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {!isProjectDetail ? <SiteHeader /> : null}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        {children}
      </main>
      {!isProjectDetail ? <SiteFooter /> : null}
    </div>
  );
}
