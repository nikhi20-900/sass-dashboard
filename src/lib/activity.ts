export type ActivityKind =
  | "update"
  | "create"
  | "login"
  | "export"
  | "invite"
  | "comment";

export interface ActivityEvent {
  id: string;
  userName: string;
  action: string;
  context: string;
  kind: ActivityKind;
  /** Minutes before "now" — demo offsets, not a live audit clock. */
  minutesAgo: number;
}

/** Latest workspace activity for the dashboard feed (newest first). */
export const recentActivities: ActivityEvent[] = [
  {
    id: "act-1008",
    userName: "Nikhil",
    action: "Updated customer profile",
    context: "Maya Patel · Northstar",
    kind: "update",
    minutesAgo: 2,
  },
  {
    id: "act-1007",
    userName: "Maya",
    action: "Created new report",
    context: "Q3 cohort conversion",
    kind: "create",
    minutesAgo: 8,
  },
  {
    id: "act-1006",
    userName: "John",
    action: "Logged in",
    context: "Pulse workspace",
    kind: "login",
    minutesAgo: 15,
  },
  {
    id: "act-1005",
    userName: "Nikhil",
    action: "Updated workspace settings",
    context: "Session timeout",
    kind: "update",
    minutesAgo: 32,
  },
  {
    id: "act-1004",
    userName: "Maya",
    action: "Exported analytics snapshot",
    context: "Revenue · 30D",
    kind: "export",
    minutesAgo: 58,
  },
  {
    id: "act-1003",
    userName: "John",
    action: "Invited a teammate",
    context: "viewer@pulse.demo",
    kind: "invite",
    minutesAgo: 95,
  },
  {
    id: "act-1002",
    userName: "Maya",
    action: "Commented on report",
    context: "Expansion risk",
    kind: "comment",
    minutesAgo: 140,
  },
];

const FEED_LIMIT = 8;

export function getRecentActivities(
  events: ActivityEvent[] = recentActivities,
  limit = FEED_LIMIT
): ActivityEvent[] {
  return [...events]
    .sort((a, b) => a.minutesAgo - b.minutesAgo)
    .slice(0, limit);
}

export function formatRelativeTime(minutesAgo: number): string {
  const minutes = Math.max(0, Math.round(minutesAgo));

  if (minutes < 1) {
    return "Just now";
  }
  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? "1 hr ago" : `${hours} hr ago`;
  }

  const days = Math.round(hours / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

export function activityOccurredAt(
  minutesAgo: number,
  now = Date.now()
): string {
  return new Date(now - minutesAgo * 60_000).toISOString();
}
