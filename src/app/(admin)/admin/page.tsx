import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CreditCard, Lock, Settings, Shield, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Administration",
  description: "Manage users, billing, and organization settings.",
};

const ADMIN_MODULES = [
  {
    id: "users",
    title: "User Management",
    description: "Invite team members, assign RBAC permissions, and manage user lifecycles.",
    href: "/admin/users",
    icon: UserCog,
    badge: "Access Control",
  },
  {
    id: "billing",
    title: "Billing & Plans",
    description: "Review subscription tier, payment methods, invoices, and seat limits.",
    href: "/admin/billing",
    icon: CreditCard,
    badge: "Finance",
  },
  {
    id: "settings",
    title: "Organization Settings",
    description: "Configure workspace branding, audit logs, security policies, and integrations.",
    href: "/admin/settings",
    icon: Settings,
    badge: "Configuration",
  },
];

export default function AdminPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Context */}
      <header className="flex flex-col gap-3">
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-violet-500/40 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300"
        >
          <Shield className="size-3 text-violet-600 dark:text-violet-400" aria-hidden="true" />
          Admin Portal
        </Badge>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Administration
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Manage organization access, team members, billing subscriptions, and system preferences.
          </p>
        </div>
      </header>

      {/* 2. Administrative Modules Grid */}
      <section aria-label="Administrative Modules" className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Administrative Modules
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADMIN_MODULES.map((module) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.id}
                className="group min-w-0 rounded-xl border border-border bg-card shadow-xs transition-all duration-150 hover:border-border hover:shadow-sm"
              >
                <CardHeader className="gap-3 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <Badge variant="secondary" className="px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {module.badge}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold tracking-tight text-foreground">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {module.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-8.5 w-full justify-between gap-2 rounded-lg border-border/80 px-3 text-xs font-medium shadow-xs transition-all hover:bg-muted group-hover:border-primary/40"
                  >
                    <Link href={module.href}>
                      <span>Open {module.title}</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. Security & Governance Card */}
      <section aria-label="Security and Governance" className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Security & Governance
          </h2>
        </div>
        <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
          <CardHeader className="gap-1.5 pb-2">
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-violet-600 dark:text-violet-400" aria-hidden="true" />
              <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Role-Based Access Control (RBAC)
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Administrative routes are guarded by server-side permission gates and middleware session validation.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-1 rounded-lg border border-border/50 bg-muted/20 p-3.5">
                <span className="text-xs font-semibold text-foreground">Super Admin</span>
                <span className="text-xs text-muted-foreground">
                  Full unrestricted access to all organization records, user lifecycles, and billing settings.
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-border/50 bg-muted/20 p-3.5">
                <span className="text-xs font-semibold text-foreground">Organization Admin</span>
                <span className="text-xs text-muted-foreground">
                  Manage members, send invites, update subscription plans, and configure preferences.
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-border/50 bg-muted/20 p-3.5">
                <span className="text-xs font-semibold text-foreground">Audit Enforcement</span>
                <span className="text-xs text-muted-foreground">
                  All administrative actions and role transitions are securely logged with user context.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
