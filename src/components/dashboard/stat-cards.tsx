import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stats, type KPITrend } from "@/lib/data";

function formatTrendValue(value: number): string {
  return `${value.toFixed(1)}%`;
}

function TrendIndicator({ trend }: { trend: KPITrend }) {
  const isUp = trend.direction === "up";
  const percent = formatTrendValue(trend.value);
  const directionLabel = isUp ? "Increased" : "Decreased";

  return (
    <p className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
      <span className="font-medium tabular-nums text-foreground">
        <span aria-hidden="true">{isUp ? "↑" : "↓"} </span>
        <span className="sr-only">{directionLabel} by </span>
        {percent}
      </span>
      <span className="text-muted-foreground">{trend.comparison}</span>
    </p>
  );
}

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label} size="sm" className="min-w-0 rounded-lg">
            <CardHeader className="gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Icon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                />
                <CardDescription className="truncate font-medium">
                  {stat.label}
                </CardDescription>
              </div>
              <CardTitle className="truncate text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TrendIndicator trend={stat.trend} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
