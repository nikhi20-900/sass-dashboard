import { Role } from "@prisma/client";

/**
 * Permissions represent granular access controls.
 * Every route, nav item, and page guard references these values.
 */
export enum Permission {
  DASHBOARD_VIEW = "dashboard:view",
  ANALYTICS_VIEW = "analytics:view",
  CUSTOMERS_VIEW = "customers:view",
  REPORTS_VIEW = "reports:view",
  USERS_MANAGE = "users:manage",
  BILLING_MANAGE = "billing:manage",
  ORG_SETTINGS_MANAGE = "org_settings:manage",
}

/**
 * Role → Permission mapping.
 * SUPER_ADMIN and ORG_ADMIN have all permissions.
 * MANAGER and VIEWER have workspace-level read permissions.
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    Permission.DASHBOARD_VIEW,
    Permission.ANALYTICS_VIEW,
    Permission.CUSTOMERS_VIEW,
    Permission.REPORTS_VIEW,
    Permission.USERS_MANAGE,
    Permission.BILLING_MANAGE,
    Permission.ORG_SETTINGS_MANAGE,
  ],
  ORG_ADMIN: [
    Permission.DASHBOARD_VIEW,
    Permission.ANALYTICS_VIEW,
    Permission.CUSTOMERS_VIEW,
    Permission.REPORTS_VIEW,
    Permission.USERS_MANAGE,
    Permission.BILLING_MANAGE,
    Permission.ORG_SETTINGS_MANAGE,
  ],
  MANAGER: [
    Permission.DASHBOARD_VIEW,
    Permission.ANALYTICS_VIEW,
    Permission.CUSTOMERS_VIEW,
    Permission.REPORTS_VIEW,
  ],
  VIEWER: [
    Permission.DASHBOARD_VIEW,
    Permission.ANALYTICS_VIEW,
    Permission.CUSTOMERS_VIEW,
    Permission.REPORTS_VIEW,
  ],
};

/** Admin-level permissions used for route gating. */
export const ADMIN_PERMISSIONS: Permission[] = [
  Permission.USERS_MANAGE,
  Permission.BILLING_MANAGE,
  Permission.ORG_SETTINGS_MANAGE,
];

/** Check if a role has a specific permission. */
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

/** Check if a role has at least one of the given permissions. */
export function hasAnyPermission(
  role: Role,
  permissions: Permission[]
): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

/** Display-friendly role labels. */
const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  ORG_ADMIN: "Org Admin",
  MANAGER: "Manager",
  VIEWER: "Viewer",
};

export function getRoleLabel(role: Role): string {
  return ROLE_LABELS[role];
}
