import type { IconType } from "react-icons";

type IconBadgeProps = {
  icon: IconType;
  size?: "sm" | "md";
  className?: string;
};

const SIZES = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-12 w-12 rounded-2xl",
} as const;

const ICON_SIZES = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
} as const;

export default function IconBadge({
  icon: Icon,
  size = "md",
  className = "",
}: IconBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-flamme-500/10 text-flamme-500 ${SIZES[size]} ${className}`}
    >
      <Icon className={ICON_SIZES[size]} />
    </span>
  );
}
