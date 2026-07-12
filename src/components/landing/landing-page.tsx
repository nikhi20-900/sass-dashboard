import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
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
import { faqs, features } from "@/lib/data";

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <Navbar />
      <section className="relative pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.16),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <Badge
              variant="outline"
              className="mb-5 w-fit gap-1 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
            >
              <Sparkles className="size-3" />
              Analytics for teams that move fast
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Pulse turns scattered metrics into a clear operating rhythm.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Bring product, revenue, and customer signals into one polished
              analytics workspace built for decisions, not dashboard sprawl.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  View dashboard <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Play className="size-4" />
                Watch demo
              </Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              {["Warehouse-ready", "No-code reports", "Governed metrics"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="relative min-h-[460px] lg:min-h-[560px]">
            <div className="absolute inset-0 rounded-[2rem] border bg-card shadow-2xl shadow-foreground/10" />
            <div className="absolute inset-3 overflow-hidden rounded-[1.55rem] border bg-background">
              <div className="flex h-12 items-center gap-2 border-b px-4">
                <span className="size-3 rounded-full bg-rose-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
                <span className="ml-4 text-sm font-medium text-muted-foreground">
                  pulse.app/insights
                </span>
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-3">
                {["ARR", "Activation", "Churn risk"].map((label, index) => (
                  <div key={label} className="rounded-lg border bg-card p-4">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-3 text-2xl font-semibold">
                      {["$128K", "64.2%", "3.8%"][index]}
                    </p>
                    <div className="mt-4 h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{ width: ["72%", "64%", "38%"][index] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mx-4 rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Weekly growth signal</p>
                    <p className="text-sm text-muted-foreground">
                      Revenue and activation by cohort
                    </p>
                  </div>
                  <Badge variant="secondary">Live</Badge>
                </div>
                <div className="mt-8 flex h-56 items-end gap-2">
                  {[34, 48, 42, 68, 74, 57, 86, 78, 92, 84, 96, 88].map(
                    (height, index) => (
                      <div key={index} className="flex flex-1 flex-col justify-end gap-2">
                        <div
                          className="rounded-t-md bg-cyan-500/70"
                          style={{ height: `${height}%` }}
                        />
                        <div className="h-1 rounded-full bg-muted" />
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="mx-4 mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm font-medium">Top segment</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Enterprise trials are up 18% week over week.
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm font-medium">Suggested action</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Route high-fit accounts to onboarding today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t bg-muted/25 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="secondary">Features</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for shared analytics momentum.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pulse keeps the operating questions close to the data, so every
              team can spot what changed and decide what comes next.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="rounded-lg">
                <CardHeader>
                  <div className="mb-3 grid size-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary">Pricing</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start lean, scale cleanly.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Switch between monthly and yearly pricing to see the numbers
              change instantly.
            </p>
          </div>
          <div className="mt-10">
            <PricingTabs />
          </div>
        </div>
      </section>

      <section id="faq" className="border-y bg-muted/25 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <Badge variant="secondary">FAQ</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Questions teams ask before they plug in data.
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-500 text-sm font-semibold text-white">
                P
              </span>
              <span className="font-semibold">Pulse</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Fictional analytics for focused growth teams.
            </p>
          </div>
          {[
            ["Product", "Dashboards", "Alerts", "Metric catalog"],
            ["Company", "About", "Careers", "Customers"],
            ["Resources", "Docs", "API", "Security"],
          ].map(([title, ...links]) => (
            <div key={title}>
              <p className="font-medium">{title}</p>
              <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                {links.map((link) => (
                  <Link key={link} href="#" className="hover:text-foreground">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}
