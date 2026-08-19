import type { Metadata } from "next";
import { BarChart3, Filter, LineChart, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Analytics",
  description: "View analytics insights and trends.",
};

export default function AnalyticsPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Context */}
      <header className="flex flex-col gap-3">
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300"
        >
          <BarChart3 className="size-3 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
          Analytics
        </Badge>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Analytics
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Deep-dive product insights, conversion funnels, and cohort retention metrics.
          </p>
        </div>
      </header>

      {/* 2. Analytics Feature Modules */}
      <section aria-label="Analytics Insights" className="space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Filter className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Funnel Conversion
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Step-by-step visitor to paid subscriber drop-off tracking.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-cyan-600 dark:text-cyan-400">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Pipeline Tracking
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <TrendingUp className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Cohort Retention
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Weekly and monthly repeat usage curves per customer group.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-cyan-600 dark:text-cyan-400">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Churn Prevention
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <LineChart className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Attribution Models
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Multi-touch acquisition channels and marketing campaign ROI.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-cyan-600 dark:text-cyan-400">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Channel Attribution
              </span>
            </CardContent>
          </Card>
        </div>

        <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
          <CardHeader className="gap-1.5 pb-2">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Analytics Engine
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Custom date range filters, segmented event charts, and automated anomaly alerts are scheduled for the next sprint.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This page is accessible to all authenticated workspace roles.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
