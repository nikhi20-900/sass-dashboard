import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Analytics", description: "View analytics insights and trends." };

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div className="grid gap-2">
        <Badge
          variant="outline"
          className="w-fit gap-1 border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
        >
          <BarChart3 className="size-3" />
          Analytics
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Analytics
        </h1>
        <p className="text-muted-foreground">
          Product and revenue analytics will be available here.
        </p>
      </div>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>
            Charts, funnels, and cohort analysis are planned for a future sprint.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This page is accessible to all authenticated roles.
        </CardContent>
      </Card>
    </div>
  );
}
