import { recentSignups, type Signup } from "@/lib/data";

export type CustomerStatus = Signup["status"];

export interface CustomerDistributionSlice {
  status: CustomerStatus;
  count: number;
  percent: number;
}

/** Same hues as the signups table status badges. */
export const CUSTOMER_STATUS_COLORS: Record<CustomerStatus, string> = {
  Active: "#10b981",
  Trial: "#06b6d4",
  Invited: "#f59e0b",
};

const STATUS_ORDER: CustomerStatus[] = ["Active", "Trial", "Invited"];

export function getCustomerDistribution(
  customers: Signup[] = recentSignups
): CustomerDistributionSlice[] {
  const total = customers.length;

  const counts: Record<CustomerStatus, number> = {
    Active: 0,
    Trial: 0,
    Invited: 0,
  };

  for (const customer of customers) {
    counts[customer.status] += 1;
  }

  return STATUS_ORDER.map((status) => ({
    status,
    count: counts[status],
    percent: total === 0 ? 0 : Number(((counts[status] / total) * 100).toFixed(1)),
  }));
}

export function getCustomerDistributionTotal(
  slices: CustomerDistributionSlice[]
): number {
  return slices.reduce((sum, slice) => sum + slice.count, 0);
}
