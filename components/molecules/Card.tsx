import type { IconType } from "react-icons";
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
  icon?: IconType;
  className?: string;
};

export default function Card({
  title,
  children,
  icon: Icon,
  className = "",
}: CardProps) {
  return (
    <div
      className={`group h-full rounded-4xl border border-charbon-100 bg-white p-7 shadow-flame transition-all duration-200 hover:-translate-y-1 hover:border-flamme-500/40 ${className}`}
    >
      {Icon && (
        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-flamme-500/10 text-flamme-500 transition-colors group-hover:bg-flamme-500 group-hover:text-white">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
      )}
      <h3 className="font-display text-2xl tracking-wider text-charbon-900">
        {title}
      </h3>
      <div className="mt-3 leading-relaxed text-charbon-600">{children}</div>
    </div>
  );
}
