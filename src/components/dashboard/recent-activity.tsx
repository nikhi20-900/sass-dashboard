"use client";

import {
  FilePlus2,
  History,
  LogIn,
  MessageSquare,
  Pencil,
  Share2,
  UserPlus,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  activityOccurredAt,
  formatRelativeTime,
  getRecentActivities,
  recentActivities,
  type ActivityEvent,
  type ActivityKind,
} from "@/lib/activity";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { RecentActivitySkeleton } from "@/components/dashboard/dashboard-skeletons";
import { getInitials } from "@/lib/utils";

const KIND_ICON: Record<ActivityKind, typeof Pencil> = {
  update: Pencil,
  create: FilePlus2,
  login: LogIn,
  export: Share2,
  invite: UserPlus,
  comment: MessageSquare,
};

function ActivityRow({ event }: { event: ActivityEvent }) {
  const Icon = KIND_ICON[event.kind];

  return (
    <li className="flex items-start gap-3 py-3 first:pt-1 last:pb-1">
      <Avatar size="sm" className="mt-0.5 ring-1 ring-border/50">
        <AvatarFallback className="text-xs font-medium">{getInitials(event.userName)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-sm font-medium text-foreground">
            {event.userName}
          </p>
          <time
            dateTime={activityOccurredAt(event.minutesAgo)}
            className="shrink-0 text-xs tabular-nums text-muted-foreground"
            suppressHydrationWarning
          >
            {formatRelativeTime(event.minutesAgo)}
          </time>
        </div>
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
          <Icon
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground/80"
          />
          <span className="min-w-0 truncate">
            <span className="font-medium text-foreground/90">{event.action}</span>
            <span className="mx-1.5 text-muted-foreground/50">·</span>
            <span>{event.context}</span>
          </span>
        </p>
      </div>
    </li>
  );
}

function EmptyActivity() {
  return (
    <DashboardEmptyState
      icon={History}
      title="No activity yet"
      description="Your recent workspace activity will appear here."
      action={{ href: "/dashboard", label: "Explore Dashboard" }}
      className="min-h-[280px] border-0"
    />
  );
}

interface RecentActivityProps {
  events?: ActivityEvent[];
  isLoading?: boolean;
}

export function RecentActivity({
  events = recentActivities,
  isLoading = false,
}: RecentActivityProps) {
  const feed = getRecentActivities(events);

  if (isLoading) {
    return <RecentActivitySkeleton />;
  }

  return (
    <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="gap-1.5 pb-2">
        <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Recent activity
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground sm:text-sm">
          Latest actions across this workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-1">
        {feed.length === 0 ? (
          <EmptyActivity />
        ) : (
          <ul className="divide-y divide-border/60">
            {feed.map((event) => (
              <ActivityRow key={event.id} event={event} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
