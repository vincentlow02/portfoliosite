import { ReactNode } from "react";

type PageIntroProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageIntro({ title, description, children }: PageIntroProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-3xl text-base text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}
