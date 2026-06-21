import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-muted p-6">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="max-w-2xl text-sm text-muted-foreground">
        The page you requested does not exist in this starter yet.
      </p>
      <Link href="/" className="text-sm font-medium underline underline-offset-4">
        Return home
      </Link>
    </div>
  );
}
