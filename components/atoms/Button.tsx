import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outlineLight" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-flamme-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-flamme-500 text-white shadow-flame hover:bg-flamme-600 hover:-translate-y-0.5",
  secondary:
    "bg-white text-charbon-900 shadow-flame hover:bg-creme-50 hover:-translate-y-0.5",
  outline:
    "border-2 border-flamme-500 text-flamme-500 hover:bg-flamme-500 hover:text-white",
  outlineLight:
    "border-2 border-white text-white hover:bg-white hover:text-charbon-900",
  ghost: "text-flamme-400 hover:text-flamme-300",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function classesFor(variant: Variant, size: Size, className: string) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export default function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "primary", size = "md", className = "" } = props;
  const classes = classesFor(variant, size, className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...buttonProps
  } = props as NativeButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
