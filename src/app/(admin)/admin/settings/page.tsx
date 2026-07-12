import { Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrgSettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div className="grid gap-2">
        <Badge
          variant="outline"
          className="w-fit gap-1 border-violet-500/40 text-violet-700 dark:text-violet-300"
        >
          <Settings className="size-3" />
          Organization Settings
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Organization Settings
        </h1>
        <p className="text-muted-foreground">
          Configure organization-level preferences, branding, and policies.
        </p>
      </div>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>
            Organization branding, security policies, and workspace management
            are planned for a future sprint.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This page is only accessible to Super Admin and Org Admin roles.
        </CardContent>
      </Card>
    </div>
  );
}
