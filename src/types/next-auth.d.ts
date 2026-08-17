import type { Role } from "@/lib/permissions/rbac";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    organizationId: string | null;
    workspaceId: string | null;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: Role;
      organizationId: string | null;
      workspaceId: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    organizationId: string | null;
    workspaceId: string | null;
  }
}
