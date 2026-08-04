export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Vincent Low</p>
        <a href="mailto:lowvincent21@gmail.com">Get in touch</a>
      </div>
    </footer>
  );
}
