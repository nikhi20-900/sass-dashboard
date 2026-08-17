import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";
import { hasPermission, Permission, type Role } from "@/lib/permissions/rbac";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  permission: Permission;
  group: "workspace" | "admin";
}

/**
 * Single source of truth for all navigation items.
 * Sidebar renders from this array — never manually constructed.
 * Adding a nav item = one entry here + the permission in rbac.ts.
 */
export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: Permission.DASHBOARD_VIEW,
    group: "workspace",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    permission: Permission.ANALYTICS_VIEW,
    group: "workspace",
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
    permission: Permission.CUSTOMERS_VIEW,
    group: "workspace",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    permission: Permission.REPORTS_VIEW,
    group: "workspace",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: UserCog,
    permission: Permission.USERS_MANAGE,
    group: "admin",
  },
  {
    title: "Billing",
    href: "/admin/billing",
    icon: CreditCard,
    permission: Permission.BILLING_MANAGE,
    group: "admin",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    permission: Permission.ORG_SETTINGS_MANAGE,
    group: "admin",
  },
];

/** Returns navigation items filtered by a role's permissions. */
export function getNavigationForRole(role: Role): NavItem[] {
  return NAVIGATION_ITEMS.filter((item) =>
    hasPermission(role, item.permission)
  );
}

/** Returns grouped navigation items for the sidebar. */
export function getGroupedNavigationForRole(role: Role): {
  workspace: NavItem[];
  admin: NavItem[];
} {
  const items = getNavigationForRole(role);
  return {
    workspace: items.filter((item) => item.group === "workspace"),
    admin: items.filter((item) => item.group === "admin"),
  };
}
