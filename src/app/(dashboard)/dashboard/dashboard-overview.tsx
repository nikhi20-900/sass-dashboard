"use client";

import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatCards } from "@/components/dashboard/stat-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { UserGrowthChart } from "@/components/dashboard/user-growth-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { CustomerDistributionChart } from "@/components/dashboard/customer-distribution-chart";
import { SignupsTable } from "@/components/dashboard/signups-table";
import { SettingsTabs } from "@/components/dashboard/settings-tabs";
import { getRoleLabel, type Role } from "@/lib/permissions/rbac";

interface DashboardOverviewProps {
  userName: string;
  userEmail: string;
  userRole: string;
}

export function DashboardOverview({
  userName,
  userEmail,
  userRole,
}: DashboardOverviewProps) {
  const firstName = userName.split(" ")[0];

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Page Context */}
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="gap-1.5 border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"
          >
            <Activity className="size-3 text-emerald-600 dark:text-emerald-400" />
            Live workspace
          </Badge>
          <Badge
            variant="secondary"
            className="px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {getRoleLabel(userRole as Role)}
          </Badge>
        </div>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Welcome back, {firstName}.
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your acquisition funnel is healthy, with revenue growth ahead of active sessions.
          </p>
        </div>
      </header>

      {/* 2. Workspace Overview (KPI Cards) */}
      <section aria-label="Key Performance Indicators" className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace Overview
          </h2>
        </div>
        <StatCards />
      </section>

      {/* 3. Primary Analytics */}
      <section aria-label="Primary Analytics" className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Analytics & Performance
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <RevenueChart />
          <UserGrowthChart />
        </div>
      </section>

      {/* 4. Secondary Information */}
      <section aria-label="Secondary Information" className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Audience & Signups
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <CustomerDistributionChart />
          <SignupsTable />
        </div>
      </section>

      {/* 5. Activity & Actions */}
      <section aria-label="Activity and Actions" className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Activity & Management
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <QuickActions userRole={userRole} />
          <RecentActivity />
          <SettingsTabs user={{ name: userName, email: userEmail }} />
        </div>
      </section>
    </div>
  );
}
