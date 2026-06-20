"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CtaButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-neon-red text-white shadow-[0_0_32px_rgba(229,9,47,0.42)] hover:bg-red-600",
  secondary:
    "bg-cream text-black hover:bg-white shadow-[0_18px_45px_rgba(255,248,241,0.18)]",
  ghost:
    "border border-white/20 bg-white/5 text-cream hover:border-soft-gold/70 hover:bg-soft-gold/10"
};

export function CtaButton({ href, children, className, variant = "primary", ...props }: CtaButtonProps) {
  const isExternal = href.startsWith("http");

  const content = (
    <motion.span
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold",
        variants[variant],
        className
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {content}
    </Link>
  );
}
