import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand px-2 py-1 text-xs font-medium text-white ${className}`}
    >
      {children}
    </span>
  );
}
