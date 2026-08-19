import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { isRole, type Role } from "@/lib/permissions/rbac";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  organizationId: string | null;
  workspaceId: string | null;
}

/**
 * Resolves the signed-in account from the database instead of trusting the
 * role and tenant claims captured when its JWT was issued. This makes role
 * downgrades, soft-deletes, and tenant changes take effect on the next server
 * render of a protected route.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: { id: userId, deletedAt: null },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      organizationId: true,
      workspaceId: true,
    },
  });

  if (!user) {
    return null;
  }

  const role = user.role;
  if (!isRole(role)) {
    return null;
  }

  return { ...user, role };
}

/** Redirect unauthenticated, soft-deleted, or malformed accounts to sign-in. */
export async function requireCurrentUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
