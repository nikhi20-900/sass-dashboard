import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { hasAnyPermission, ADMIN_PERMISSIONS } from "@/lib/permissions/rbac";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!hasAnyPermission(session.user.role, ADMIN_PERMISSIONS)) {
    redirect("/dashboard");
  }

  return (
    <DashboardShell user={session.user}>
      {children}
    </DashboardShell>
  );
}
