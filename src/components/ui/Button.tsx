"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";
type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-[var(--color-brand-hover)] focus:ring-brand border-transparent",
  secondary:
    "btn-secondary-glass focus:ring-brand",
};

const baseStyles =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-[var(--motion-fast)] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-100";

export function Button({
  variant = "primary",
  children,
  className = "",
  href,
  disabled,
  ...props
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    const { href: _h, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonAsButton).type ?? "button"}
      disabled={disabled}
      className={styles}
      {...(props as ButtonAsButton)}
    >
      {children}
    </button>
  );
}
