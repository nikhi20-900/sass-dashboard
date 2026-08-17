import { revenueDaily, revenueOverTime, type RevenuePoint } from "@/lib/data";

export type RevenuePeriod = "7D" | "30D" | "90D" | "1Y";

export const REVENUE_PERIODS = ["7D", "30D", "90D", "1Y"] as const;

export const DEFAULT_REVENUE_PERIOD: RevenuePeriod = "30D";

export function getRevenueForPeriod(period: RevenuePeriod): RevenuePoint[] {
  switch (period) {
    case "7D":
      return revenueDaily.slice(-7);
    case "30D":
      return revenueDaily.slice(-30);
    case "90D":
      return revenueDaily.slice();
    case "1Y":
      return revenueOverTime.slice();
  }
}
