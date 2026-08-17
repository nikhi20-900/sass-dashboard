import {
  Activity,
  BarChart3,
  BellRing,
  Globe2,
  LineChart,
  ShieldCheck,
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

export interface StatCard {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
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

export const stats: StatCard[] = [
  { label: "Revenue", value: "$128.4K", trend: "+12.8% vs last month", positive: true },
  { label: "Users", value: "24,982", trend: "+8.2% new accounts", positive: true },
  { label: "Conversion", value: "7.46%", trend: "+1.1 pts this week", positive: true },
  { label: "Active sessions", value: "1,482", trend: "-3.4% from yesterday", positive: false },
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

