import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading administrative portal</span>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-8 w-60 sm:h-9" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-2">
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full max-w-xs" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
