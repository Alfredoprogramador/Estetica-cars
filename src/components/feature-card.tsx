import { ReactNode } from "react";

type FeatureCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function FeatureCard({ eyebrow, title, description, children }: FeatureCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">{eyebrow}</p>
      ) : null}
      <h3 className="mt-3 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </article>
  );
}
