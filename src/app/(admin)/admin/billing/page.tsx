import type { Metadata } from "next";
import { CheckCircle2, CreditCard, FileText, Receipt, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Billing & Subscriptions",
  description: "Manage billing and subscription settings.",
};

export default function BillingPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Context */}
      <header className="flex flex-col gap-3">
        <Badge
          variant="outline"
          className="w-fit gap-1.5 border-violet-500/40 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300"
        >
          <CreditCard className="size-3 text-violet-600 dark:text-violet-400" aria-hidden="true" />
          Admin · Billing & Plans
        </Badge>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Billing & Subscriptions
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Manage your organization tier, payment methods, and invoice history.
          </p>
        </div>
      </header>

      {/* 2. Plan and Modules */}
      <section aria-label="Subscription and Billing Details" className="space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <div className="flex items-center justify-between">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <Sparkles className="size-4" aria-hidden="true" />
                </span>
                <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  Active
                </Badge>
              </div>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Enterprise Plan
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Unlimited team seats, advanced analytics, and custom webhooks.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Billed annually · Renews Dec 2026
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Receipt className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Payment Method
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Primary card ending in •••• 4242 (Stripe integration).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Automatic payments enabled
              </span>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2 pb-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <FileText className="size-4" aria-hidden="true" />
              </span>
              <CardTitle className="text-base font-bold tracking-tight text-foreground">
                Invoice History
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Download past invoices and monthly tax summaries.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
                12 historical invoices available
              </span>
            </CardContent>
          </Card>
        </div>

        <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
          <CardHeader className="gap-1.5 pb-2">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Billing Configuration
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Manage subscription tier, change credit card details, or set up invoice recipients.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This module is restricted to Super Admin and Organization Admin roles. Stripe Customer Portal integration and receipt management will be rendered here.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
