"use client";

import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatCards } from "@/components/dashboard/stat-cards";
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
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div className="grid gap-2">
        <Badge
          variant="outline"
          className="w-fit gap-1 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
        >
          <Activity className="size-3" />
          Live workspace
        </Badge>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome back, {firstName}.
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {getRoleLabel(userRole as Role)}
          </p>
          <p className="mt-2 text-muted-foreground">
            Your acquisition funnel is healthy, with revenue growth ahead of active sessions.
          </p>
        </div>
      </div>
      <StatCards />
      <SignupsTable />
      <SettingsTabs user={{ name: userName, email: userEmail }} />
    </div>
  );
}
