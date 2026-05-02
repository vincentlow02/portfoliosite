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
  const isWorkIndex = pathname === "/projects";
  const isMinimalPage = isProjectDetail || isWorkIndex;

  return (
    <div className="flex min-h-screen flex-col">
      {!isMinimalPage ? <SiteHeader /> : null}
      <main
        className={
          isMinimalPage
            ? "flex w-full flex-1 flex-col"
            : "mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10"
        }
      >
        {children}
      </main>
      {!isMinimalPage ? <SiteFooter /> : null}
    </div>
  );
}
