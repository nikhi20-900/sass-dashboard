import type { Metadata } from "next";
import { Activity, ShieldCheck, Sparkles, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Customers",
  description: "Manage and view customer data.",
};

export default function CustomersPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Context */}
      <header className="flex flex-col gap-3">
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"
        >
          <Users className="size-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          Customers
        </Badge>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Customers
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Customer segmentation, lifecycle tracking, and account health monitoring.
          </p>
        </div>
      </header>

      {/* 2. Customer Modules */}
      <section aria-label="Customer Capabilities" className="space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <UserCheck className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Customer 360
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Unified account profiles with billing, activity, and engagement history.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Unified Profiles
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Activity className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Health Scoring
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Automated sentiment and feature adoption scores to detect churn early.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Predictive Health
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Dynamic Segments
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Real-time cohort filtering by plan, ARR band, and login frequency.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Smart Segmentation
              </span>
            </CardContent>
          </Card>
        </div>

        <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
          <CardHeader className="gap-1.5 pb-2">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Customer Directory
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Comprehensive customer table with batch tag editing, CSV export, and lifecycle stage filters will be available in the upcoming release.
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
