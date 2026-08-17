import Link from "next/link";
import { cn } from "@/lib/utils";

interface PulseLogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  showText?: boolean;
}

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
} as const;

const textSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
} as const;

export function PulseLogo({ size = "md", href, className, showText = true }: PulseLogoProps) {
  const content = (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid place-items-center rounded-lg bg-emerald-500 font-semibold text-white shadow-sm shadow-emerald-500/25",
          sizes[size]
        )}
      >
        P
      </span>
      {showText && (
        <span className={cn("font-semibold tracking-tight", textSizes[size])}>
          Pulse
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Pulse home">
        {content}
      </Link>
    );
  }

  return content;
}
