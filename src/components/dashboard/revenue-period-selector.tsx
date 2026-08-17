"use client";

import type { KeyboardEvent } from "react";
import {
  REVENUE_PERIODS,
  type RevenuePeriod,
} from "@/lib/revenue-period";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RevenuePeriodSelector({
  value,
  onChange,
}: {
  value: RevenuePeriod;
  onChange: (period: RevenuePeriod) => void;
}) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = REVENUE_PERIODS.indexOf(value);
    if (currentIndex < 0) return;

    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % REVENUE_PERIODS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + REVENUE_PERIODS.length) % REVENUE_PERIODS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = REVENUE_PERIODS.length - 1;
    }

    if (nextIndex === null) return;

    const nextPeriod = REVENUE_PERIODS[nextIndex];
    if (!nextPeriod) return;

    event.preventDefault();
    onChange(nextPeriod);

    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
    buttons[nextIndex]?.focus();
  }

  return (
    <div
      role="group"
      aria-label="Revenue period"
      onKeyDown={handleKeyDown}
      className="flex max-w-full flex-wrap items-center rounded-lg border border-border bg-muted/40 p-0.5"
    >
      {REVENUE_PERIODS.map((period) => {
        const selected = value === period;
        return (
          <Button
            key={period}
            type="button"
            variant={selected ? "default" : "ghost"}
            size="sm"
            aria-pressed={selected}
            className={cn(
              "min-h-8 min-w-10 flex-1 px-2.5 text-xs font-medium sm:flex-none",
              selected
                ? "bg-background text-foreground shadow-xs hover:bg-background"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onChange(period)}
          >
            {period}
          </Button>
        );
      })}
    </div>
  );
}
