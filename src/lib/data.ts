import {
  Activity,
  BarChart3,
  BellRing,
  DollarSign,
  Globe2,
  LineChart,
  Percent,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type KPITrend = {
  value: number;
  direction: "up" | "down";
  comparison: string;
};

export interface StatCard {
  label: string;
  value: string;
  trend: KPITrend;
  icon: LucideIcon;
}

export interface KPISnapshot {
  current: number;
  previous: number;
}

export interface Signup {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "Starter" | "Growth" | "Scale";
  status: "Active" | "Trial" | "Invited";
  joined: string;
  revenue: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  target?: number;
}

export const features: Feature[] = [
  {
    title: "Live revenue pulse",
    description: "Track expansion, churn risk, and daily ARR movement in one fast view.",
    icon: LineChart,
  },
  {
    title: "Journey funnels",
    description: "See where users convert, hesitate, and return across every product path.",
    icon: BarChart3,
  },
  {
    title: "Smart anomaly alerts",
    description: "Get notified when behavior changes before it becomes a board slide.",
    icon: BellRing,
  },
  {
    title: "Global cohort lens",
    description: "Compare acquisition channels, regions, and segments without rebuilding reports.",
    icon: Globe2,
  },
  {
    title: "Governed metrics",
    description: "Keep every team aligned around approved definitions and trusted dashboards.",
    icon: ShieldCheck,
  },
  {
    title: "Workflow context",
    description: "Turn every chart into an owner, note, and next action your team can follow.",
    icon: Activity,
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "For small teams finding their rhythm.",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ["3 workspaces", "Core dashboards", "7-day data refresh", "Email support"],
  },
  {
    name: "Growth",
    description: "For teams scaling product and revenue decisions.",
    monthlyPrice: 79,
    yearlyPrice: 790,
    popular: true,
    features: ["Unlimited dashboards", "Hourly refresh", "Anomaly alerts", "Shared metric catalog"],
  },
  {
    name: "Scale",
    description: "For businesses with advanced governance needs.",
    monthlyPrice: 189,
    yearlyPrice: 1890,
    features: ["SAML SSO", "Custom roles", "Warehouse sync", "Priority onboarding"],
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Can Pulse connect to our warehouse?",
    answer:
      "Yes. Pulse is designed around warehouse-first analytics and can also ingest event streams and billing tools.",
  },
  {
    question: "Is the pricing really fictional?",
    answer:
      "Very much so. This demo uses realistic tiers, but no payments or accounts are connected.",
  },
  {
    question: "Can non-technical teammates use it?",
    answer:
      "Pulse focuses on saved views, plain-language annotations, and curated metrics so teams can self-serve safely.",
  },
  {
    question: "Does the dashboard data update?",
    answer:
      "The dashboard uses typed mock data for this build, with interactive sorting, filtering, row actions, and form validation.",
  },
];

const KPI_COMPARISON = "vs previous period";

function percentChange(current: number, previous: number): number {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}

export function buildKPITrend(
  current: number,
  previous: number,
  comparison = KPI_COMPARISON
): KPITrend {
  const change = Number(percentChange(current, previous).toFixed(1));

  return {
    value: Math.abs(change),
    direction: change >= 0 ? "up" : "down",
    comparison,
  };
}

function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatRate(value: number): string {
  return `${value.toFixed(2)}%`;
}

/** Period snapshots for Users, Conversion Rate, and Active Sessions. */
export const kpiSnapshots = {
  users: { current: 24_982, previous: 23_088 },
  conversionRate: { current: 7.46, previous: 7.38 },
  activeSessions: { current: 1_482, previous: 1_534 },
} as const satisfies Record<string, KPISnapshot>;

export interface UserGrowthPoint {
  month: string;
  users: number;
}

/**
 * Monthly registered-user totals. Latest two months match `kpiSnapshots.users`
 * so the Users KPI and this chart stay aligned.
 */
export const userGrowthOverTime: UserGrowthPoint[] = [
  { month: "Aug 2025", users: 15_240 },
  { month: "Sep 2025", users: 15_890 },
  { month: "Oct 2025", users: 16_620 },
  { month: "Nov 2025", users: 17_410 },
  { month: "Dec 2025", users: 18_180 },
  { month: "Jan 2026", users: 18_840 },
  { month: "Feb 2026", users: 19_620 },
  { month: "Mar 2026", users: 20_480 },
  { month: "Apr 2026", users: 21_350 },
  { month: "May 2026", users: 22_190 },
  { month: "Jun 2026", users: kpiSnapshots.users.previous },
  { month: "Jul 2026", users: kpiSnapshots.users.current },
];

export const recentSignups: Signup[] = [
  { id: "SGN-1001", name: "Maya Patel", email: "maya@northstar.io", company: "Northstar", plan: "Growth", status: "Active", joined: "2026-07-10", revenue: 790 },
  { id: "SGN-1002", name: "Ethan Brooks", email: "ethan@brightlayer.com", company: "Brightlayer", plan: "Starter", status: "Trial", joined: "2026-07-09", revenue: 290 },
  { id: "SGN-1003", name: "Sophia Chen", email: "sophia@orbitlabs.co", company: "Orbit Labs", plan: "Scale", status: "Active", joined: "2026-07-08", revenue: 1890 },
  { id: "SGN-1004", name: "Lucas Meyer", email: "lucas@fieldkit.ai", company: "Fieldkit", plan: "Growth", status: "Invited", joined: "2026-07-08", revenue: 790 },
  { id: "SGN-1005", name: "Ava Johnson", email: "ava@marketflow.com", company: "Marketflow", plan: "Starter", status: "Trial", joined: "2026-07-07", revenue: 290 },
  { id: "SGN-1006", name: "Noah Williams", email: "noah@relayhq.dev", company: "RelayHQ", plan: "Growth", status: "Active", joined: "2026-07-07", revenue: 790 },
  { id: "SGN-1007", name: "Isabella Garcia", email: "isabella@clearbitex.com", company: "Clearbitex", plan: "Scale", status: "Active", joined: "2026-07-06", revenue: 1890 },
  { id: "SGN-1008", name: "Liam Thompson", email: "liam@tidalcrm.com", company: "Tidal CRM", plan: "Starter", status: "Invited", joined: "2026-07-06", revenue: 290 },
  { id: "SGN-1009", name: "Olivia Brown", email: "olivia@quantumdesk.io", company: "QuantumDesk", plan: "Growth", status: "Active", joined: "2026-07-05", revenue: 790 },
  { id: "SGN-1010", name: "James Wilson", email: "james@acornpay.co", company: "AcornPay", plan: "Growth", status: "Trial", joined: "2026-07-05", revenue: 790 },
  { id: "SGN-1011", name: "Amelia Davis", email: "amelia@waypoint.app", company: "Waypoint", plan: "Scale", status: "Active", joined: "2026-07-04", revenue: 1890 },
  { id: "SGN-1012", name: "Benjamin Lee", email: "ben@signalforge.com", company: "SignalForge", plan: "Starter", status: "Active", joined: "2026-07-04", revenue: 290 },
  { id: "SGN-1013", name: "Mia Rodriguez", email: "mia@foundryops.io", company: "FoundryOps", plan: "Growth", status: "Invited", joined: "2026-07-03", revenue: 790 },
  { id: "SGN-1014", name: "Henry Clark", email: "henry@novagrid.dev", company: "NovaGrid", plan: "Starter", status: "Trial", joined: "2026-07-03", revenue: 290 },
  { id: "SGN-1015", name: "Charlotte King", email: "charlotte@upliftdata.com", company: "Uplift Data", plan: "Scale", status: "Active", joined: "2026-07-02", revenue: 1890 },
];

export const revenueOverTime: RevenuePoint[] = [
  { month: "Aug 2025", revenue: 68200, target: 65000 },
  { month: "Sep 2025", revenue: 72500, target: 70000 },
  { month: "Oct 2025", revenue: 76800, target: 75000 },
  { month: "Nov 2025", revenue: 81400, target: 80000 },
  { month: "Dec 2025", revenue: 89100, target: 85000 },
  { month: "Jan 2026", revenue: 86400, target: 88000 },
  { month: "Feb 2026", revenue: 92300, target: 90000 },
  { month: "Mar 2026", revenue: 98700, target: 95000 },
  { month: "Apr 2026", revenue: 104200, target: 100000 },
  { month: "May 2026", revenue: 109600, target: 106000 },
  { month: "Jun 2026", revenue: 113830, target: 112000 },
  { month: "Jul 2026", revenue: 128400, target: 120000 },
];

const latestRevenue = revenueOverTime[revenueOverTime.length - 1]?.revenue ?? 0;
const previousRevenue = revenueOverTime[revenueOverTime.length - 2]?.revenue ?? latestRevenue;

export const stats: StatCard[] = [
  {
    label: "Revenue",
    value: formatCompactCurrency(latestRevenue),
    trend: buildKPITrend(latestRevenue, previousRevenue),
    icon: DollarSign,
  },
  {
    label: "Users",
    value: formatCount(kpiSnapshots.users.current),
    trend: buildKPITrend(kpiSnapshots.users.current, kpiSnapshots.users.previous),
    icon: Users,
  },
  {
    label: "Conversion Rate",
    value: formatRate(kpiSnapshots.conversionRate.current),
    trend: buildKPITrend(
      kpiSnapshots.conversionRate.current,
      kpiSnapshots.conversionRate.previous
    ),
    icon: Percent,
  },
  {
    label: "Active Sessions",
    value: formatCount(kpiSnapshots.activeSessions.current),
    trend: buildKPITrend(
      kpiSnapshots.activeSessions.current,
      kpiSnapshots.activeSessions.previous
    ),
    icon: Activity,
  },
];

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Weekend-softer weekday mix for billed revenue (Sun…Sat). */
const WEEKDAY_WEIGHT = [0.82, 1.08, 1.12, 1.1, 1.08, 1.05, 0.75] as const;

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dailySeriesForMonth(
  year: number,
  monthIndex: number,
  monthlyRevenue: number,
  monthlyTarget: number,
  seed: number,
): RevenuePoint[] {
  const days = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const rand = mulberry32(seed);
  const weights: number[] = [];

  for (let day = 1; day <= days; day += 1) {
    const weekday = new Date(Date.UTC(year, monthIndex, day)).getUTCDay();
    const noise = 0.94 + rand() * 0.12;
    weights.push(WEEKDAY_WEIGHT[weekday] * noise);
  }

  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  const dailyTarget = Math.round(monthlyTarget / days);
  const points: RevenuePoint[] = [];
  let allocated = 0;

  for (let i = 0; i < days; i += 1) {
    const isLast = i === days - 1;
    const revenue = isLast
      ? monthlyRevenue - allocated
      : Math.max(0, Math.round((monthlyRevenue * weights[i]) / weightSum));
    allocated += revenue;
    points.push({
      month: `${SHORT_MONTHS[monthIndex]} ${i + 1}`,
      revenue,
      target: dailyTarget,
    });
  }

  return points;
}

function monthlyPoint(label: string): RevenuePoint & { target: number } {
  const point = revenueOverTime.find((entry) => entry.month === label);
  if (!point || point.target === undefined) {
    throw new Error(`Expected monthly revenue with target for ${label}`);
  }
  return { month: point.month, revenue: point.revenue, target: point.target };
}

const may2026 = monthlyPoint("May 2026");
const jun2026 = monthlyPoint("Jun 2026");
const jul2026 = monthlyPoint("Jul 2026");

/** Full May–Jul 2026 daily billed revenue (92 days); 90D uses the last 90. */
const revenueDailyMayThroughJul: RevenuePoint[] = [
  ...dailySeriesForMonth(2026, 4, may2026.revenue, may2026.target, 202605),
  ...dailySeriesForMonth(2026, 5, jun2026.revenue, jun2026.target, 202606),
  ...dailySeriesForMonth(2026, 6, jul2026.revenue, jul2026.target, 202607),
];

/** Last 90 days ending Jul 31, 2026 (May 3–Jul 31). */
export const revenueDaily: RevenuePoint[] = revenueDailyMayThroughJul.slice(-90);

