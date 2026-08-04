import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { normalizeLocale } from "@/lib/site-locale";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const locale = normalizeLocale(
    request.nextUrl.searchParams.get("lang") ?? undefined,
  );

  requestHeaders.set("x-site-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|videos).*)"],
};
