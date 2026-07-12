import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div className="grid gap-2">
        <Badge
          variant="outline"
          className="w-fit gap-1 border-amber-500/40 text-amber-700 dark:text-amber-300"
        >
          <FileText className="size-3" />
          Reports
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Reports
        </h1>
        <p className="text-muted-foreground">
          Scheduled and ad-hoc reporting will be available here.
        </p>
      </div>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>
            Exportable reports, scheduled email digests, and report templates are
            planned for a future sprint.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This page is accessible to all authenticated roles.
        </CardContent>
      </Card>
    </div>
  );
}
