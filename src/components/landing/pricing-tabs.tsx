"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingTiers } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PricingTabs() {
  return (
    <Tabs defaultValue="monthly" className="mx-auto max-w-6xl w-full">
      <div className="flex justify-center">
        <TabsList className="grid w-full max-w-xs grid-cols-2 rounded-xl p-1">
          <TabsTrigger value="monthly" className="rounded-lg text-sm font-medium">
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly" className="rounded-lg text-sm font-medium">
            Yearly
            <span className="ml-1.5 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
              Save 20%
            </span>
          </TabsTrigger>
        </TabsList>
      </div>

      {(["monthly", "yearly"] as const).map((cadence) => (
        <TabsContent key={cadence} value={cadence} className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricingTiers.map((tier) => {
              const price =
                cadence === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;

              return (
                <Card
                  key={tier.name}
                  className={cn(
                    "relative flex flex-col justify-between rounded-xl border border-border bg-card shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                    tier.popular &&
                      "border-emerald-500/60 ring-2 ring-emerald-500/20 dark:border-emerald-400/60 dark:ring-emerald-400/20"
                  )}
                >
                  {tier.popular ? (
                    <Badge className="absolute right-4 top-4 bg-emerald-600 text-white shadow-xs dark:bg-emerald-500 hover:bg-emerald-600">
                      Most popular
                    </Badge>
                  ) : null}
                  <div>
                    <CardHeader className={cn("space-y-1.5", tier.popular ? "pr-32" : "")}>
                      <CardTitle className="text-xl font-semibold tracking-tight">{tier.name}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{tier.description}</CardDescription>
                    </CardHeader>
                    <div className="px-6 pb-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold tracking-tight text-foreground">
                          ${price}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          /{cadence === "monthly" ? "month" : "year"}
                        </span>
                      </div>
                      {cadence === "yearly" && (
                        <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          Billed annually (${Math.round(price / 12)}/mo equivalent)
                        </p>
                      )}
                    </div>
                  </div>

                  <CardContent className="flex flex-1 flex-col justify-between gap-6 pt-4">
                    <ul className="space-y-3 text-sm">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="size-4 shrink-0 text-emerald-500 mt-0.5" aria-hidden="true" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="mt-6 w-full font-medium shadow-xs"
                      variant={tier.popular ? "default" : "outline"}
                    >
                      <Link href="/register">
                        Choose {tier.name}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
