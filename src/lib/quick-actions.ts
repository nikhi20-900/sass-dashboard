import {
  FileText,
  Settings,
  UserCog,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { hasPermission, Permission, type Role } from "@/lib/permissions/rbac";

export interface QuickAction {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  permission: Permission;
}

/**
 * Dashboard shortcuts into existing routes.
 * Visibility is gated by the same permissions as sidebar navigation.
 */
export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "add-customer",
    label: "Add Customer",
    href: "/dashboard/customers",
    icon: UserPlus,
    permission: Permission.CUSTOMERS_VIEW,
  },
  {
    id: "view-reports",
    label: "View Reports",
    href: "/dashboard/reports",
    icon: FileText,
    permission: Permission.REPORTS_VIEW,
  },
  {
    id: "manage-team",
    label: "Manage Team",
    href: "/admin/users",
    icon: UserCog,
    permission: Permission.USERS_MANAGE,
  },
  {
    id: "org-settings",
    label: "Organization Settings",
    href: "/admin/settings",
    icon: Settings,
    permission: Permission.ORG_SETTINGS_MANAGE,
  },
];

export function getQuickActionsForRole(role: Role): QuickAction[] {
  return QUICK_ACTIONS.filter((action) =>
    hasPermission(role, action.permission)
  );
}
