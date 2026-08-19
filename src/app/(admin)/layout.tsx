import { redirect } from "next/navigation";
import { requireCurrentUser } from "@/lib/auth/current-user";
import { hasAnyPermission, ADMIN_PERMISSIONS } from "@/lib/permissions/rbac";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireCurrentUser();

  if (!hasAnyPermission(user.role, ADMIN_PERMISSIONS)) {
    redirect("/dashboard");
  }

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}
