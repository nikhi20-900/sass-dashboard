"use client";

import { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recentSignups, type Signup } from "@/lib/data";
import {
  CUSTOMER_STATUS_COLORS,
  getCustomerDistribution,
  getCustomerDistributionTotal,
  type CustomerDistributionSlice,
} from "@/lib/customer-distribution";

interface DistributionTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: CustomerDistributionSlice;
  }>;
}

function DistributionTooltip({ active, payload }: DistributionTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const slice = payload[0]?.payload;
  if (!slice) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border/80 bg-popover/95 p-3 shadow-md backdrop-blur-md transition-all">
      <p className="border-b border-border/60 pb-2 text-xs font-semibold text-foreground">
        {slice.status} Customers
      </p>
      <div className="mt-2.5 space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-6">
          <span className="text-muted-foreground">Count:</span>
          <span className="font-semibold tabular-nums text-foreground">
            {slice.count}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-muted-foreground">Share:</span>
          <span className="font-semibold tabular-nums text-foreground">
            {slice.percent.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyDistribution() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <Users aria-hidden="true" className="size-5 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">No customers yet</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        When signups land in this workspace, their Active, Trial, and Invited
        mix will show here.
      </p>
    </div>
  );
}

interface CustomerDistributionChartProps {
  customers?: Signup[];
}

export function CustomerDistributionChart({
  customers = recentSignups,
}: CustomerDistributionChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slices = useMemo(
    () => getCustomerDistribution(customers),
    [customers]
  );
  const total = getCustomerDistributionTotal(slices);
  const chartSlices = slices.filter((slice) => slice.count > 0);

  return (
    <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="gap-1.5 pb-2">
        <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Customer Distribution
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground sm:text-sm">
          Signups by status across the current workspace list.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {total === 0 ? (
          <EmptyDistribution />
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-around sm:gap-8">
            <div className="relative h-[200px] w-full max-w-[240px] shrink-0">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartSlices}
                      dataKey="count"
                      nameKey="status"
                      innerRadius="62%"
                      outerRadius="88%"
                      paddingAngle={2}
                      stroke="var(--card)"
                      strokeWidth={2}
                    >
                      {chartSlices.map((slice) => (
                        <Cell
                          key={slice.status}
                          fill={CUSTOMER_STATUS_COLORS[slice.status]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={<DistributionTooltip />}
                      cursor={false}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="size-full" />
              )}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold tabular-nums tracking-tight text-foreground sm:text-3xl">
                  {total}
                </span>
                <span className="text-xs font-medium text-muted-foreground">customers</span>
              </div>
            </div>

            <ul className="grid w-full min-w-0 max-w-md flex-1 gap-2.5">
              {slices.map((slice) => (
                <li
                  key={slice.status}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-muted/30 px-3.5 py-2 text-sm transition-colors"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="size-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: CUSTOMER_STATUS_COLORS[slice.status],
                      }}
                    />
                    <span className="truncate font-medium text-foreground">
                      {slice.status}
                    </span>
                  </span>
                  <div className="flex items-center gap-3 shrink-0 tabular-nums">
                    <span className="font-semibold text-foreground">
                      {slice.count}
                    </span>
                    <span className="rounded-md bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-border/50">
                      {slice.percent.toFixed(1)}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
