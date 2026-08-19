import type { Metadata } from "next";
import { Building2, CheckCircle2, Globe, KeyRound, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Organization Settings",
  description: "Configure organization-level settings.",
};

export default function OrgSettingsPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Context */}
      <header className="flex flex-col gap-3">
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-violet-500/40 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300"
        >
          <Settings className="size-3 text-violet-600 dark:text-violet-400" aria-hidden="true" />
          Admin · Organization Settings
        </Badge>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Organization Settings
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Configure organization-level preferences, domain security, and API integrations.
          </p>
        </div>
      </header>

      {/* 2. Settings Modules */}
      <section aria-label="Organization Settings Modules" className="space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Building2 className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Organization Profile
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Name, slug, primary logo, and custom branding palette.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Pulse Analytics Default
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <KeyRound className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Security & 2FA
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Enforce two-factor authentication and session timeouts for all members.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                JWT session enforcement active
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Globe className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Domain & SSO
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                SAML 2.0 and OIDC single sign-on domain verification.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
                Scheduled for Enterprise Sprint
              </span>
            </CardContent>
          </Card>
        </div>

        <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
          <CardHeader className="gap-1.5 pb-2">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              System Configuration
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Global organization preferences, data retention policies, and webhook endpoints.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This module is restricted to Super Admin and Organization Admin roles. Fine-grained webhook delivery and security policy toggles will be rendered here.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
