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
import {
  ArrowUpRight,
  Calendar,
  LineChart,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RevenuePoint } from "@/lib/data";
import {
  DEFAULT_REVENUE_PERIOD,
  getRevenueForPeriod,
  type RevenuePeriod,
} from "@/lib/revenue-period";
import { cn } from "@/lib/utils";
import { RevenuePeriodSelector } from "@/components/dashboard/revenue-period-selector";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import {
  ChartCardSkeleton,
  ChartPlotSkeleton,
} from "@/components/dashboard/dashboard-skeletons";

function formatCurrency(val: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
}

function formatKCurrency(val: number): string {
  if (val >= 1000000) {
    return `$${(val / 1000000).toFixed(1)}M`;
  }
  if (val >= 1000) {
    return `$${Math.round(val / 1000)}k`;
  }
  return `$${val}`;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
    payload: RevenuePoint;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0]?.payload;
  if (!data) return null;

  const revenue = data.revenue;
  const target = data.target ?? 0;
  const diff = target > 0 ? revenue - target : 0;
  const diffPercent = target > 0 ? ((diff / target) * 100).toFixed(1) : null;

  return (
    <div className="rounded-lg border border-border/80 bg-popover/95 p-3 shadow-md backdrop-blur-md transition-all">
      <div className="flex items-center gap-1.5 border-b border-border/60 pb-2 text-xs font-semibold text-foreground">
        <Calendar className="size-3.5 text-muted-foreground" aria-hidden="true" />
        <span>{data.month} Trailing Period</span>
      </div>

      <div className="mt-2.5 space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Revenue:</span>
          </div>
          <span className="font-semibold tabular-nums text-foreground">
            {formatCurrency(revenue)}
          </span>
        </div>

        {target > 0 && (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-cyan-500" />
              <span className="text-muted-foreground">Target:</span>
            </div>
            <span className="font-medium tabular-nums text-muted-foreground">
              {formatCurrency(target)}
            </span>
          </div>
        )}

        {target > 0 && diffPercent && (
          <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-1.5 text-[11px]">
            <span className="text-muted-foreground">Variance:</span>
            <span
              className={cn(
                "flex items-center font-medium tabular-nums",
                diff >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-500 dark:text-rose-400"
              )}
            >
              {diff >= 0 ? "+" : ""}
              {formatCurrency(diff)} ({diff >= 0 ? "+" : ""}
              {diffPercent}%)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface RevenueChartProps {
  data?: RevenuePoint[];
  isLoading?: boolean;
}

export function RevenueChart({ data, isLoading = false }: RevenueChartProps) {
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<RevenuePeriod>(DEFAULT_REVENUE_PERIOD);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = useMemo(
    () => (data !== undefined ? data : getRevenueForPeriod(period)),
    [data, period]
  );

  const currentRevenue = chartData[chartData.length - 1]?.revenue ?? 0;
  const previousRevenue =
    chartData[chartData.length - 2]?.revenue ?? currentRevenue;
  const momGrowth =
    previousRevenue > 0
      ? (((currentRevenue - previousRevenue) / previousRevenue) * 100).toFixed(
          1
        )
      : "0.0";

  const totalPeriodRevenue = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.revenue, 0),
    [chartData]
  );

  const averageMonthlyRevenue = useMemo(
    () => (chartData.length ? totalPeriodRevenue / chartData.length : 0),
    [chartData, totalPeriodRevenue]
  );

  if (isLoading) {
    return <ChartCardSkeleton />;
  }

  if (chartData.length === 0) {
    return (
      <Card className="min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Revenue Over Time
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Recurring revenue trajectory and target attainment.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DashboardEmptyState
            icon={LineChart}
            title="No revenue data"
            description="There isn't enough data to display this chart yet."
            className="min-h-[420px] border-0"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1.5 border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
              </span>
              Live ARR Velocity
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"
            >
              <TrendingUp className="size-3" aria-hidden="true" />
              +{momGrowth}% MoM
            </Badge>
          </div>
          <div>
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Revenue Over Time
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Recurring revenue trajectory and target attainment for {period}.
            </CardDescription>
          </div>
        </div>

        <CardAction className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <RevenuePeriodSelector value={period} onChange={setPeriod} />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 border-y border-border/60 py-3 sm:grid-cols-4 sm:gap-6">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Current MRR
            </span>
            <div className="mt-1 truncate text-lg font-bold tabular-nums text-foreground sm:text-xl">
              {formatCurrency(currentRevenue)}
            </div>
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Period Total
            </span>
            <div className="mt-1 truncate text-lg font-bold tabular-nums text-foreground sm:text-xl">
              {formatCurrency(totalPeriodRevenue)}
            </div>
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              {period === "1Y" ? "Monthly Avg" : "Daily Avg"}
            </span>
            <div className="mt-1 truncate text-lg font-bold tabular-nums text-foreground sm:text-xl">
              {formatCurrency(averageMonthlyRevenue)}
            </div>
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Target Status
            </span>
            <div className="mt-1 flex items-center gap-1.5 text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400 sm:text-xl">
              <span>+2.7%</span>
              <Badge
                variant="outline"
                className="h-4.5 border-emerald-500/30 bg-emerald-500/10 px-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-300"
              >
                Above
              </Badge>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-[320px] w-full min-h-[300px]">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient
                    id="targetGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
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
                  minTickGap={period === "7D" ? 8 : 28}
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickFormatter={formatKCurrency}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#10b981",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                    opacity: 0.5,
                  }}
                />

                {/* Target Projection Line */}
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#06b6d4"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="url(#targetGradient)"
                  fillOpacity={0.5}
                  activeDot={{
                    r: 4,
                    fill: "#06b6d4",
                    stroke: "var(--background)",
                    strokeWidth: 2,
                  }}
                />

                {/* Main Revenue Area */}
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
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

        {/* Legend / Footer Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-foreground">Actual MRR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-0.5 w-3 rounded-full bg-cyan-500" />
              <span>Target Benchmark</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <Target className="size-3 text-emerald-500" aria-hidden="true" />
            <span>Updated continuously via warehouse billing sync</span>
            <ArrowUpRight className="size-3 text-muted-foreground" aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

