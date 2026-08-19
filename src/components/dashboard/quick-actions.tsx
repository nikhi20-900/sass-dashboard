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
    <Card className="rounded-lg">
      <CardHeader className="gap-1">
        <CardTitle>Quick actions</CardTitle>
        <CardDescription>
          Jump to common workspace and organization tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <nav aria-label="Quick actions">
          <ul
            className={
              actions.length <= 2
                ? "grid grid-cols-1 gap-2 sm:grid-cols-2"
                : "grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4"
            }
          >
            {actions.map((action, index) => {
              const Icon = action.icon;

              return (
                <li key={action.id} className="min-w-0">
                  <Button
                    asChild
                    variant={index === 0 ? "default" : "outline"}
                    className="h-9 w-full justify-start gap-2 px-3"
                  >
                    <Link href={action.href}>
                      <Icon aria-hidden="true" />
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
