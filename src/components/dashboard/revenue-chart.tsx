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
  Sparkles,
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
    <div className="rounded-lg border border-border/80 bg-popover/95 p-3.5 shadow-xl backdrop-blur-md transition-all">
      <div className="flex items-center gap-1.5 border-b border-border/60 pb-2 text-xs font-semibold text-foreground">
        <Calendar className="size-3.5 text-muted-foreground" />
        <span>{data.month} Trailing Period</span>
      </div>

      <div className="mt-2.5 space-y-2 text-xs">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
            <span className="text-muted-foreground">Revenue:</span>
          </div>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(revenue)}
          </span>
        </div>

        {target > 0 && (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-cyan-500 shadow-xs shadow-cyan-500/50" />
              <span className="text-muted-foreground">Target:</span>
            </div>
            <span className="font-medium text-cyan-600 dark:text-cyan-400">
              {formatCurrency(target)}
            </span>
          </div>
        )}

        {target > 0 && diffPercent && (
          <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-1.5 text-[11px]">
            <span className="text-muted-foreground">Variance:</span>
            <span
              className={cn(
                "flex items-center font-medium",
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

export function RevenueChart() {
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<RevenuePeriod>(DEFAULT_REVENUE_PERIOD);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = useMemo(() => getRevenueForPeriod(period), [period]);

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

  return (
    <Card className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
              </span>
              Live ARR Velocity
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-medium"
            >
              <TrendingUp className="size-3" />
              +{momGrowth}% MoM
            </Badge>
          </div>
          <div>
            <CardTitle className="text-xl font-bold tracking-tight">
              Revenue Over Time
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Recurring revenue trajectory and target attainment for {period}.
            </CardDescription>
          </div>
        </div>

        <CardAction className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <RevenuePeriodSelector value={period} onChange={setPeriod} />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 border-y border-border/50 py-3 sm:grid-cols-4">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Current MRR
            </span>
            <div className="mt-0.5 text-lg font-bold text-foreground sm:text-xl">
              {formatCurrency(currentRevenue)}
            </div>
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Period Total
            </span>
            <div className="mt-0.5 text-lg font-bold text-foreground sm:text-xl">
              {formatCurrency(totalPeriodRevenue)}
            </div>
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {period === "1Y" ? "Monthly Avg" : "Daily Avg"}
            </span>
            <div className="mt-0.5 text-lg font-bold text-foreground sm:text-xl">
              {formatCurrency(averageMonthlyRevenue)}
            </div>
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Target Status
            </span>
            <div className="mt-0.5 flex items-center gap-1.5 text-lg font-bold text-emerald-600 dark:text-emerald-400 sm:text-xl">
              <span>+2.7%</span>
              <Badge
                variant="outline"
                className="h-4 border-emerald-500/30 bg-emerald-500/10 px-1 text-[10px] text-emerald-600 dark:text-emerald-300"
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
                margin={{ top: 12, right: 12, left: -16, bottom: 4 }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop
                      offset="50%"
                      stopColor="#10b981"
                      stopOpacity={0.15}
                    />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient
                    id="targetGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
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
                    opacity: 0.6,
                  }}
                />

                {/* Target Projection Line */}
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#06b6d4"
                  strokeWidth={1.75}
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
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  activeDot={{
                    r: 6,
                    fill: "#10b981",
                    stroke: "var(--background)",
                    strokeWidth: 2,
                    className: "drop-shadow-md",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted/20">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="size-4 animate-spin text-emerald-500" />
                Loading chart visualization...
              </div>
            </div>
          )}
        </div>

        {/* Legend / Footer Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-foreground">Actual MRR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-0.5 w-3 rounded-full bg-cyan-500" />
              <span>Target Benchmark</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <Target className="size-3 text-emerald-500" />
            <span>Updated continuously via warehouse billing sync</span>
            <ArrowUpRight className="size-3 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
