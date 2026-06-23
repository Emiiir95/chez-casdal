import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = light ? "text-white" : "text-charbon-900";
  const subColor = light ? "text-white/80" : "text-charbon-500";
  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-flamme-500">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl tracking-wider sm:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${subColor}`}>{subtitle}</p>
      )}
    </div>
  );
}
