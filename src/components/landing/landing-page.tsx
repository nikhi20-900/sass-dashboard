import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/landing/navbar";
import { PricingTabs } from "@/components/landing/pricing-tabs";
import { PulseLogo } from "@/components/pulse-logo";
import { faqs, features } from "@/lib/data";

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_36%),radial-gradient(circle_at_80%_15%,rgba(6,182,212,0.14),transparent_34%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-8 lg:px-8">
          <div className="flex flex-col justify-center">
            <Badge
              variant="outline"
              className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-700 backdrop-blur-xs transition-colors dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300"
            >
              <Sparkles className="size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              Analytics for teams that move fast
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Pulse turns scattered metrics into a{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                clear operating rhythm.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
              Bring product, revenue, and customer signals into one polished
              analytics workspace built for decisions, not dashboard sprawl.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="font-medium shadow-sm">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <span>View dashboard</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium">
                <Link href="#features" className="flex items-center gap-2">
                  <Play className="size-4 text-muted-foreground" aria-hidden="true" />
                  <span>Watch demo</span>
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-2.5 text-xs sm:grid-cols-3 sm:gap-3 sm:text-sm text-muted-foreground">
              {["Warehouse-ready", "No-code reports", "Governed metrics"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Polished Mockup Preview Card */}
          <div className="w-full min-w-0">
            <div className="relative w-full rounded-2xl border border-border/80 bg-gradient-to-b from-card to-card/60 p-2 sm:p-3 shadow-2xl shadow-foreground/5 sm:rounded-3xl dark:shadow-black/40">
              <div className="overflow-hidden rounded-xl border border-border/60 bg-background/95 backdrop-blur-xs sm:rounded-2xl">
                {/* Window Header */}
                <div className="flex h-11 items-center justify-between border-b border-border/60 px-3 sm:px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 sm:size-3 rounded-full bg-rose-400/90" />
                    <span className="size-2.5 sm:size-3 rounded-full bg-amber-400/90" />
                    <span className="size-2.5 sm:size-3 rounded-full bg-emerald-400/90" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    pulse.app/insights
                  </div>
                  <span className="text-[11px] text-muted-foreground hidden xs:inline-block">Live sync</span>
                </div>

                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 gap-2.5 p-3 xs:grid-cols-3 sm:gap-3 sm:p-4">
                  {[
                    { label: "ARR", value: "$128.4K", pct: "72%", change: "+18.2%" },
                    { label: "Activation", value: "64.2%", pct: "64%", change: "+4.1%" },
                    { label: "Churn Risk", value: "3.8%", pct: "38%", change: "-1.2%" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-border/70 bg-card p-3 sm:p-3.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{item.change}</span>
                      </div>
                      <p className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl">
                        {item.value}
                      </p>
                      <div className="mt-2.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          style={{ width: item.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart Mockup */}
                <div className="mx-3 rounded-xl border border-border/70 bg-card p-3 sm:mx-4 sm:p-4 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">Weekly growth signal</p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground">
                        Revenue and activation by cohort
                      </p>
                    </div>
                    <Badge variant="outline" className="border-emerald-500/40 text-[11px] text-emerald-600 dark:text-emerald-400">
                      Live
                    </Badge>
                  </div>
                  <div className="mt-6 flex h-40 sm:h-48 items-end gap-1.5 sm:gap-2">
                    {[34, 48, 42, 68, 74, 57, 86, 78, 92, 84, 96, 88].map(
                      (height, index) => (
                        <div key={index} className="flex flex-1 flex-col justify-end gap-1.5 h-full">
                          <div
                            className="rounded-t-sm sm:rounded-t bg-gradient-to-t from-teal-500 to-cyan-400 opacity-80 hover:opacity-100 transition-opacity"
                            style={{ height: `${height}%` }}
                          />
                          <div className="h-0.5 rounded-full bg-muted" />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Insights Row */}
                <div className="grid grid-cols-1 gap-2.5 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4">
                  <div className="rounded-xl border border-border/70 bg-card p-3 sm:p-3.5 shadow-xs">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="size-3.5" />
                      Top segment
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Enterprise trials are up 18% week over week.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-card p-3 sm:p-3.5 shadow-xs">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400">
                      <Zap className="size-3.5" />
                      Suggested action
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Route high-fit accounts to onboarding today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border/80 bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="font-semibold">Features</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Built for shared analytics momentum.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Pulse keeps the operating questions close to the data, so every
              team can spot what changed and decide what comes next.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="rounded-xl border border-border bg-card shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border/80"
              >
                <CardHeader className="space-y-2.5 pb-2">
                  <div className="grid size-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-semibold tracking-tight">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="font-semibold">Pricing</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Start lean, scale cleanly.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Switch between monthly and yearly pricing to see the numbers
              change instantly.
            </p>
          </div>
          <div className="mt-12">
            <PricingTabs />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="border-y border-border/80 bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <div>
            <Badge variant="secondary" className="font-semibold">FAQ</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Questions teams ask before they plug in data.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Everything you need to know about getting started, connecting data, and collaborating across your workspace.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card px-5 shadow-xs transition-colors not-last:border-b-0"
              >
                <AccordionTrigger className="text-base font-medium hover:no-underline py-4 text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-4 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-5">
            <div className="col-span-2">
              <PulseLogo size="sm" />
              <p className="mt-3.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
                Modern operational analytics for fast-moving product and revenue teams.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </div>
            </div>
            {[
              {
                title: "Product",
                links: [
                  { label: "Dashboards", href: "/dashboard" },
                  { label: "Features", href: "#features" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Metric Catalog", href: "/dashboard" },
                ],
              },
              {
                title: "Company",
                links: [
                  { label: "About", href: "#" },
                  { label: "Customers", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Contact", href: "#" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { label: "Documentation", href: "#" },
                  { label: "API Reference", href: "#" },
                  { label: "Security", href: "#" },
                  { label: "Privacy Policy", href: "#" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold tracking-tight text-foreground">{col.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-8 sm:flex-row text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Pulse Analytics, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
