"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stats } from "@/lib/data";
import { cn } from "@/lib/utils";

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-lg">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-2xl">{stat.value}</CardTitle>
            <CardAction>
              <Badge
                variant="secondary"
                className={cn(
                  stat.positive
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                )}
              >
                {stat.positive ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                {stat.trend.split(" ")[0]}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {stat.trend}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
