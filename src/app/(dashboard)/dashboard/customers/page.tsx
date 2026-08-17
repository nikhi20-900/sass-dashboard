import type { Metadata } from "next";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Customers", description: "Manage and view customer data." };

export default function CustomersPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div className="grid gap-2">
        <Badge
          variant="outline"
          className="w-fit gap-1 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
        >
          <Users className="size-3" />
          Customers
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Customers
        </h1>
        <p className="text-muted-foreground">
          Customer management and segmentation will be available here.
        </p>
      </div>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>
            Customer profiles, segments, and lifecycle tracking are planned for a
            future sprint.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This page is accessible to all authenticated roles.
        </CardContent>
      </Card>
    </div>
  );
}
