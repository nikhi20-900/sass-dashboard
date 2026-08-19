import type { Metadata } from "next";
import { requireCurrentUser } from "@/lib/auth/current-user";
import { DashboardOverview } from "./dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Pulse analytics dashboard overview.",
};

export default async function DashboardPage() {
  const user = await requireCurrentUser();

  return (
    <DashboardOverview
      userName={user.name}
      userEmail={user.email}
      userRole={user.role}
    />
  );
}
