import type { Metadata } from "next";
import { BarChart3, FileText, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireCurrentUser } from "@/lib/auth/current-user";
import { hasPermission, Permission } from "@/lib/permissions/rbac";
import {
  recentSignups,
  revenueOverTime,
  stats,
  userGrowthOverTime,
} from "@/lib/data";
import { ReportExport, type KPIStat } from "./report-export";

export const metadata: Metadata = {
  title: "Reports",
  description: "Generate and view analytics reports.",
};

export default async function ReportsPage() {
  const user = await requireCurrentUser();
  const canExport = hasPermission(user.role, Permission.REPORTS_EXPORT);

  // Serialise KPI stats (strip non-serialisable icon/function references)
  const kpiStats: KPIStat[] = stats.map((s) => ({
    label: s.label,
    value: s.value,
    trendValue: s.trend.value,
    trendDirection: s.trend.direction,
    trendComparison: s.trend.comparison,
  }));

  const signups = recentSignups.map((s) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    company: s.company,
    plan: s.plan,
    status: s.status,
    joined: s.joined,
    revenue: s.revenue,
  }));

  const revenueData = revenueOverTime.map((r) => ({
    month: r.month,
    revenue: r.revenue,
    target: r.target,
  }));

  const userGrowthData = userGrowthOverTime.map((u) => ({
    month: u.month,
    users: u.users,
  }));

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Context */}
      <header className="flex flex-col gap-3">
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300"
        >
          <FileText className="size-3 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          Reports
        </Badge>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Reports
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Export your dashboard data as CSV, Excel, or PDF.
            </p>
          </div>
          {canExport && (
            <ReportExport
              kpiStats={kpiStats}
              signups={signups}
              revenueData={revenueData}
              userGrowthData={userGrowthData}
            />
          )}
        </div>
      </header>

      {/* 2. KPI Summary Cards */}
      <section aria-label="Executive KPI Metrics" className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Executive KPI Summary
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiStats.map((kpi) => (
            <Card
              key={kpi.label}
              className="min-w-0 rounded-xl border border-border bg-card shadow-xs transition-all duration-150 hover:border-border hover:shadow-sm"
            >
              <CardHeader className="gap-2 pb-1">
                <CardDescription className="truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                  {kpi.label}
                </CardDescription>
                <CardTitle className="truncate text-2xl font-bold tracking-tight text-foreground tabular-nums sm:text-3xl">
                  {kpi.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-xs sm:text-sm">
                  <span className="inline-flex items-center font-medium tabular-nums text-foreground">
                    <span
                      aria-hidden="true"
                      className={
                        kpi.trendDirection === "up"
                          ? "text-emerald-600 dark:text-emerald-400 mr-0.5"
                          : "text-rose-600 dark:text-rose-400 mr-0.5"
                      }
                    >
                      {kpi.trendDirection === "up" ? "↑" : "↓"}
                    </span>
                    <span className="sr-only">
                      {kpi.trendDirection === "up" ? "Increased" : "Decreased"} by{" "}
                    </span>
                    {kpi.trendValue.toFixed(1)}%
                  </span>
                  <span className="text-xs text-muted-foreground">{kpi.trendComparison}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Available Datasets */}
      <section aria-label="Available Datasets" className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Datasets Included in Export
          </h2>
        </div>
        <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
          <CardHeader className="gap-1.5 pb-2">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Available Data
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              {canExport
                ? "The exports include the following datasets in CSV, Excel, and PDF formats."
                : "Contact your administrator to request export access."}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-3.5 transition-colors hover:bg-muted/30">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Users className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tabular-nums text-foreground">
                    {signups.length} Records
                  </p>
                  <p className="truncate text-xs text-muted-foreground">Recent signups</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-3.5 transition-colors hover:bg-muted/30">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <BarChart3 className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tabular-nums text-foreground">
                    {revenueData.length} Months
                  </p>
                  <p className="truncate text-xs text-muted-foreground">Revenue trajectory</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-3.5 transition-colors hover:bg-muted/30">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <TrendingUp className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tabular-nums text-foreground">
                    {userGrowthData.length} Months
                  </p>
                  <p className="truncate text-xs text-muted-foreground">User growth data</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-3.5 transition-colors hover:bg-muted/30">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <FileText className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tabular-nums text-foreground">
                    {kpiStats.length} Metrics
                  </p>
                  <p className="truncate text-xs text-muted-foreground">Executive KPIs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
