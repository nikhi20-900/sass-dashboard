import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface DashboardEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    href: string;
    label: string;
  };
  className?: string;
}

export function DashboardEmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: DashboardEmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action ? (
        <EmptyContent>
          <Button asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  );
}
