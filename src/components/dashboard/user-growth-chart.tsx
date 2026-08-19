"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Calendar, LineChart, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userGrowthOverTime, type UserGrowthPoint } from "@/lib/data";
import { cn } from "@/lib/utils";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import {
  ChartCardSkeleton,
  ChartPlotSkeleton,
} from "@/components/dashboard/dashboard-skeletons";

function formatUsers(val: number): string {
  return new Intl.NumberFormat("en-US").format(val);
}

function formatCompactUsers(val: number): string {
  if (val >= 1_000_000) {
    return `${(val / 1_000_000).toFixed(1)}M`;
  }
  if (val >= 1_000) {
    return `${Math.round(val / 1_000)}k`;
  }
  return String(val);
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
    payload: UserGrowthPoint;
  }>;
  label?: string;
  series: UserGrowthPoint[];
}

function CustomTooltip({ active, payload, series }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0]?.payload;
  if (!data) return null;

  const pointIndex = series.findIndex((point) => point.month === data.month);
  const previousUsers = pointIndex > 0 ? series[pointIndex - 1].users : null;
  const netNew = previousUsers !== null ? data.users - previousUsers : null;
  const netPercent =
    previousUsers && previousUsers > 0 && netNew !== null
      ? ((netNew / previousUsers) * 100).toFixed(1)
      : null;

  return (
    <div className="rounded-lg border border-border/80 bg-popover/95 p-3 shadow-md backdrop-blur-md transition-all">
      <div className="flex items-center gap-1.5 border-b border-border/60 pb-2 text-xs font-semibold text-foreground">
        <Calendar className="size-3.5 text-muted-foreground" aria-hidden="true" />
        <span>{data.month}</span>
      </div>

      <div className="mt-2.5 space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Users:</span>
          </div>
          <span className="font-semibold tabular-nums text-foreground">
            {formatUsers(data.users)}
          </span>
        </div>

        {netNew !== null && netPercent && (
          <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-1.5 text-[11px]">
            <span className="text-muted-foreground">Net new:</span>
            <span
              className={cn(
                "flex items-center font-medium tabular-nums",
                netNew >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-500 dark:text-rose-400"
              )}
            >
              {netNew >= 0 ? "+" : ""}
              {formatUsers(netNew)} ({netNew >= 0 ? "+" : ""}
              {netPercent}%)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface UserGrowthChartProps {
  data?: UserGrowthPoint[];
  isLoading?: boolean;
}

export function UserGrowthChart({
  data,
  isLoading = false,
}: UserGrowthChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = data ?? userGrowthOverTime;

  const currentUsers = chartData[chartData.length - 1]?.users ?? 0;
  const previousUsers = chartData[chartData.length - 2]?.users ?? currentUsers;
  const firstUsers = chartData[0]?.users ?? currentUsers;
  const momGrowth =
    previousUsers > 0
      ? (((currentUsers - previousUsers) / previousUsers) * 100).toFixed(1)
      : "0.0";
  const netNew = currentUsers - previousUsers;
  const twelveMonthNet = currentUsers - firstUsers;

  const momPositive = Number(momGrowth) >= 0;

  const yDomain = useMemo(() => {
    if (chartData.length === 0) {
      return [0, 1] as const;
    }
    const values = chartData.map((point) => point.users);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = Math.max(500, Math.round((max - min) * 0.08));
    return [Math.max(0, min - pad), max + pad] as const;
  }, [chartData]);

  if (isLoading) {
    return <ChartCardSkeleton />;
  }

  if (chartData.length === 0) {
    return (
      <Card className="min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <CardHeader className="flex flex-col gap-3 pb-3">
          <div>
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              User Growth
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Cumulative registered users over time.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DashboardEmptyState
            icon={LineChart}
            title="No user growth data"
            description="There isn't enough data to display this chart yet."
            className="min-h-[420px] border-0"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="flex flex-col gap-3 pb-3">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1.5 border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Registered users
            </Badge>
            <Badge
              variant="secondary"
              className={cn(
                "gap-1 px-2.5 py-0.5 text-xs font-medium",
                momPositive
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
              )}
            >
              <TrendingUp className="size-3" aria-hidden="true" />
              {momPositive ? "+" : ""}
              {momGrowth}% MoM
            </Badge>
          </div>
          <div>
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              User Growth
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Cumulative registered users from Aug 2025 through Jul 2026.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="min-w-0 space-y-4 pt-1">
        <div className="grid grid-cols-2 gap-3 border-y border-border/60 py-3 sm:grid-cols-4 sm:gap-6">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Current users
            </span>
            <div className="mt-1 truncate text-lg font-bold tabular-nums text-foreground sm:text-xl">
              {formatUsers(currentUsers)}
            </div>
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Net new
            </span>
            <div className="mt-1 truncate text-lg font-bold tabular-nums text-foreground sm:text-xl">
              {netNew >= 0 ? "+" : ""}
              {formatUsers(netNew)}
            </div>
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Previous month
            </span>
            <div className="mt-1 truncate text-lg font-bold tabular-nums text-foreground sm:text-xl">
              {formatUsers(previousUsers)}
            </div>
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              12-month net
            </span>
            <div className="mt-1 truncate text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400 sm:text-xl">
              {twelveMonthNet >= 0 ? "+" : ""}
              {formatUsers(twelveMonthNet)}
            </div>
          </div>
        </div>

        <div className="h-[320px] w-full min-h-[300px] min-w-0 overflow-hidden">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="userGrowthGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  strokeOpacity={0.5}
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={28}
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  domain={[yDomain[0], yDomain[1]]}
                  tickFormatter={formatCompactUsers}
                />

                <Tooltip
                  content={<CustomTooltip series={chartData} />}
                  cursor={{
                    stroke: "#10b981",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                    opacity: 0.5,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="users"
                  name="Users"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#userGrowthGradient)"
                  activeDot={{
                    r: 5,
                    fill: "#10b981",
                    stroke: "var(--background)",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ChartPlotSkeleton />
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-foreground">Registered users</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <Users className="size-3 text-emerald-500" aria-hidden="true" />
            <span>Aligned with the Users KPI snapshot</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

