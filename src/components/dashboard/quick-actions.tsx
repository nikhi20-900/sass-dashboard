"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getQuickActionsForRole } from "@/lib/quick-actions";
import { Role } from "@/lib/permissions/rbac";

function isRole(value: string): value is Role {
  return Object.values(Role).includes(value as Role);
}

interface QuickActionsProps {
  userRole: string;
}

export function QuickActions({ userRole }: QuickActionsProps) {
  const role = isRole(userRole) ? userRole : Role.VIEWER;
  const actions = getQuickActionsForRole(role);

  if (actions.length === 0) {
    return null;
  }

  return (
    <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="gap-1.5 pb-2">
        <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Quick actions
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground sm:text-sm">
          Jump to common workspace and organization tasks.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <nav aria-label="Quick actions">
          <ul
            className={
              actions.length <= 2
                ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
                : "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
            }
          >
            {actions.map((action, index) => {
              const Icon = action.icon;

              return (
                <li key={action.id} className="min-w-0">
                  <Button
                    asChild
                    variant={index === 0 ? "default" : "outline"}
                    className="h-10 w-full justify-start gap-2.5 px-3.5 text-sm font-medium transition-all hover:translate-x-0.5 active:scale-[0.99]"
                  >
                    <Link href={action.href}>
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span className="truncate">{action.label}</span>
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}
