import type { ReactNode } from "react";

type ProseStackProps = {
  children: ReactNode;
  className?: string;
};

export default function ProseStack({
  children,
  className = "",
}: ProseStackProps) {
  return (
    <div
      className={`mx-auto max-w-3xl space-y-5 text-charbon-700 ${className}`}
    >
      {children}
    </div>
  );
}
