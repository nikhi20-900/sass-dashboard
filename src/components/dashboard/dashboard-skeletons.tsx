import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ScreenReaderStatus({ label }: { label: string }) {
  return <span className="sr-only">{label}</span>;
}

export function StatCardsSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-busy="true"
      aria-live="polite"
    >
      <ScreenReaderStatus label="Loading metrics" />
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} size="sm" className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
          <CardHeader className="gap-2 pb-1">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="size-4 shrink-0 rounded-sm" />
            </div>
            <Skeleton className="h-8 w-28 sm:h-9" />
          </CardHeader>
          <CardContent className="pt-0">
            <Skeleton className="h-4 w-36" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ChartPlotSkeleton() {
  return (
    <div
      className="flex h-full min-h-[300px] w-full min-w-0 flex-col gap-3"
      aria-busy="true"
      aria-live="polite"
    >
      <ScreenReaderStatus label="Loading chart" />
      <div className="flex min-h-0 flex-1 items-end gap-2">
        <div className="flex h-full w-8 shrink-0 flex-col justify-between py-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
        <Skeleton className="h-full min-h-[260px] w-full rounded-md" />
      </div>
      <div className="flex justify-between gap-2 pl-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-8" />
        ))}
      </div>
    </div>
  );
}

export function ChartCardSkeleton() {
  return (
    <Card
      className="min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-xs"
      aria-busy="true"
      aria-live="polite"
    >
      <ScreenReaderStatus label="Loading chart" />
      <CardHeader className="flex flex-col gap-4 pb-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-5 w-28 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-w-0 pt-2">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 border-y border-border/60 py-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="min-w-0">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="mt-2 h-6 w-24 sm:h-7" />
              </div>
            ))}
          </div>
          <div className="h-[320px] w-full min-h-[300px] min-w-0">
            <ChartPlotSkeleton />
          </div>
          <div className="flex items-center justify-between gap-2 pt-1">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentActivitySkeleton() {
  return (
    <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs" aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label="Loading recent activity" />
      <CardHeader className="gap-1 pb-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border/60">
          {Array.from({ length: 7 }).map((_, index) => (
            <li
              key={index}
              className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0"
            >
              <Skeleton className="mt-0.5 size-8 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-full max-w-xs" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function SignupsTableSkeleton() {
  return (
    <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs" aria-busy="true" aria-live="polite">
      <ScreenReaderStatus label="Loading recent signups" />
      <CardHeader className="flex flex-col gap-4 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>
        <Skeleton className="h-9 w-full sm:w-72 md:w-80 rounded-lg" />
      </CardHeader>
      <CardContent className="overflow-x-auto pt-0">
        <div className="flex min-w-[640px] flex-col">
          <div className="flex gap-4 border-b border-border/70 bg-muted/30 px-4 py-2.5">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-4 flex-1" />
            ))}
          </div>
          {Array.from({ length: 8 }).map((_, row) => (
            <div key={row} className="flex items-center gap-4 border-b border-border/50 px-4 py-3">
              <div className="flex flex-1 flex-col gap-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-14" />
              <Skeleton className="size-8 shrink-0 rounded-md" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionsSkeleton() {
  return (
    <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs" aria-busy="true">
      <CardHeader className="gap-1 pb-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Page Context */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-8 w-64 max-w-full sm:h-9" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>
      </div>

      {/* 2. Workspace Overview */}
      <div className="space-y-3 sm:space-y-4">
        <Skeleton className="h-3.5 w-36" />
        <StatCardsSkeleton />
      </div>

      {/* 3. Primary Analytics */}
      <div className="space-y-4 sm:space-y-6">
        <Skeleton className="h-3.5 w-44" />
        <div className="flex flex-col gap-6">
          <ChartCardSkeleton />
          <ChartCardSkeleton />
        </div>
      </div>

      {/* 4. Secondary Information */}
      <div className="space-y-4 sm:space-y-6">
        <Skeleton className="h-3.5 w-36" />
        <div className="flex flex-col gap-6">
          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-1.5 pb-2">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="pt-2">
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
          <SignupsTableSkeleton />
        </div>
      </div>

      {/* 5. Activity & Actions */}
      <div className="space-y-4 sm:space-y-6">
        <Skeleton className="h-3.5 w-40" />
        <div className="flex flex-col gap-6">
          <QuickActionsSkeleton />
          <RecentActivitySkeleton />
          <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
            <CardHeader className="gap-1.5 pb-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="mt-3 h-8 w-52" />
            </CardHeader>
            <CardContent className="pt-2">
              <Skeleton className="h-36 w-full max-w-xl" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function DashboardPageSkeleton() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-8 w-48 sm:h-9" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-full max-w-lg" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
