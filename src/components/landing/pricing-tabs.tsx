"use client";

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
    <Tabs defaultValue="monthly" className="mx-auto max-w-6xl">
      <TabsList className="mx-auto grid w-fit grid-cols-2">
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
      </TabsList>
      {(["monthly", "yearly"] as const).map((cadence) => (
        <TabsContent key={cadence} value={cadence} className="mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            {pricingTiers.map((tier) => {
              const price =
                cadence === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;

              return (
                <Card
                  key={tier.name}
                  className={cn(
                    "relative rounded-lg",
                    tier.popular &&
                      "border-emerald-500/50 ring-2 ring-emerald-500/25"
                  )}
                >
                  {tier.popular ? (
                    <Badge className="absolute right-4 top-4 bg-emerald-500 text-white">
                      Most popular
                    </Badge>
                  ) : null}
                  <CardHeader className="pr-32">
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-6">
                    <div>
                      <span className="text-4xl font-semibold tracking-tight">
                        ${price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /{cadence === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    <ul className="grid gap-3 text-sm">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="size-4 text-emerald-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-auto"
                      variant={tier.popular ? "default" : "outline"}
                    >
                      Choose {tier.name}
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
