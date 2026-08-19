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
    <div className="rounded-lg border border-border/80 bg-popover/95 p-3.5 shadow-xl backdrop-blur-md">
      <p className="border-b border-border/60 pb-2 text-xs font-semibold text-foreground">
        {slice.status}
      </p>
      <div className="mt-2.5 space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-6">
          <span className="text-muted-foreground">Customers</span>
          <span className="font-semibold tabular-nums text-foreground">
            {slice.count}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-muted-foreground">Share</span>
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
    <Card className="rounded-lg">
      <CardHeader className="gap-1">
        <CardTitle>Customer Distribution</CardTitle>
        <CardDescription>
          Signups by status across the current workspace list.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <EmptyDistribution />
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
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
                <span className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                  {total}
                </span>
                <span className="text-xs text-muted-foreground">customers</span>
              </div>
            </div>

            <ul className="grid w-full min-w-0 flex-1 gap-2">
              {slices.map((slice) => (
                <li
                  key={slice.status}
                  className="flex items-baseline justify-between gap-3 text-sm"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: CUSTOMER_STATUS_COLORS[slice.status],
                      }}
                    />
                    <span className="truncate text-muted-foreground">
                      {slice.status}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums text-foreground">
                    {slice.count}
                    <span className="ml-2 text-muted-foreground">
                      {slice.percent.toFixed(1)}%
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
