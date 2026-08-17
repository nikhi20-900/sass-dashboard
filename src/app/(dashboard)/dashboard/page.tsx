import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { DashboardOverview } from "./dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Pulse analytics dashboard overview.",
};

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <DashboardOverview
      userName={user?.name ?? "User"}
      userEmail={user?.email ?? ""}
      userRole={user?.role ?? "VIEWER"}
    />
  );
}
