import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, UserCog, UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage user accounts and roles.",
};

export default function UsersPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Context */}
      <header className="flex flex-col gap-3">
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-violet-500/40 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300"
        >
          <UserCog className="size-3 text-violet-600 dark:text-violet-400" aria-hidden="true" />
          Admin · User Management
        </Badge>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            User Management
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Invite, manage, and assign roles to team members across your organization.
          </p>
        </div>
      </header>

      {/* 2. Management Modules */}
      <section aria-label="User Management Overview" className="space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <UserPlus className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Team Invitations
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Send email invites with predefined roles and workspace assignments.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                NextAuth + Prisma Schema ready
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                RBAC Hierarchy
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Super Admin, Org Admin, Member, and Viewer permission tiers.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Active server-side authorization
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Users className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Active Directory
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Paginated user directory with search, filter, and revocation actions.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
                Scheduled for Next Sprint
              </span>
            </CardContent>
          </Card>
        </div>

        <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
          <CardHeader className="gap-1.5 pb-2">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              User Directory & Lifecycle
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Manage existing memberships, change roles, and revoke access.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This module is restricted to Super Admin and Organization Admin roles. Full interactive member table with inline role editing will be rendered here.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
