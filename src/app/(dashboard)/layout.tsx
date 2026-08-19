import { requireCurrentUser } from "@/lib/auth/current-user";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireCurrentUser();

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}
