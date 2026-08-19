import { BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stats, type KPITrend, type StatCard } from "@/lib/data";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { StatCardsSkeleton } from "@/components/dashboard/dashboard-skeletons";

function formatTrendValue(value: number): string {
  return `${value.toFixed(1)}%`;
}

function TrendIndicator({ trend }: { trend: KPITrend }) {
  const isUp = trend.direction === "up";
  const percent = formatTrendValue(trend.value);
  const directionLabel = isUp ? "Increased" : "Decreased";

  return (
    <p className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-xs sm:text-sm">
      <span className="inline-flex items-center font-medium tabular-nums text-foreground">
        <span aria-hidden="true" className={isUp ? "text-emerald-600 dark:text-emerald-400 mr-0.5" : "text-rose-600 dark:text-rose-400 mr-0.5"}>
          {isUp ? "↑" : "↓"}
        </span>
        <span className="sr-only">{directionLabel} by </span>
        {percent}
      </span>
      <span className="text-xs text-muted-foreground">{trend.comparison}</span>
    </p>
  );
}

interface StatCardsProps {
  items?: StatCard[];
  isLoading?: boolean;
}

export function StatCards({ items = stats, isLoading = false }: StatCardsProps) {
  if (isLoading) {
    return <StatCardsSkeleton />;
  }

  if (items.length === 0) {
    return (
      <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
        <CardContent className="pt-1">
          <DashboardEmptyState
            icon={BarChart3}
            title="No metrics yet"
            description="KPI values will appear here when data is available."
            className="min-h-[132px] border-0 py-8"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="min-w-0 rounded-xl border border-border bg-card shadow-xs transition-all duration-150 hover:border-border hover:shadow-sm"
          >
            <CardHeader className="gap-2 pb-1">
              <div className="flex min-w-0 items-center justify-between gap-2">
                <CardDescription className="truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                  {stat.label}
                </CardDescription>
                <Icon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground/70"
                />
              </div>
              <CardTitle className="truncate text-2xl font-bold tracking-tight text-foreground tabular-nums sm:text-3xl">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <TrendIndicator trend={stat.trend} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
