"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Eye,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentSignups, type Signup } from "@/lib/data";
import { cn } from "@/lib/utils";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { SignupsTableSkeleton } from "@/components/dashboard/dashboard-skeletons";

type SortKey = keyof Pick<
  Signup,
  "name" | "company" | "plan" | "status" | "joined" | "revenue"
>;

type SortConfig = {
  key: SortKey;
  direction: "asc" | "desc";
};

function StatusBadge({ status }: { status: Signup["status"] }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        {status}
      </span>
    );
  }
  if (status === "Trial") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
        <span className="size-1.5 rounded-full bg-cyan-500" aria-hidden="true" />
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
      <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
      {status}
    </span>
  );
}

function SortButton({
  label,
  sortKey,
  sortConfig,
  onSort,
  align = "left",
}: {
  label: string;
  sortKey: SortKey;
  sortConfig: SortConfig;
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
}) {
  const active = sortConfig.key === sortKey;

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-7 px-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors gap-1.5",
        align === "right" ? "ml-auto -mr-1.5" : "-ml-1.5",
        active && "text-foreground font-bold"
      )}
      onClick={() => onSort(sortKey)}
      aria-label={`Sort by ${label}`}
    >
      <span>{label}</span>
      {active && sortConfig.direction === "asc" ? (
        <ArrowUp className="size-3 text-primary shrink-0" aria-hidden="true" />
      ) : active ? (
        <ArrowDown className="size-3 text-primary shrink-0" aria-hidden="true" />
      ) : (
        <ChevronsUpDown className="size-3 opacity-40 shrink-0" aria-hidden="true" />
      )}
    </Button>
  );
}

export function SignupsTable({
  data = recentSignups,
  isLoading = false,
}: {
  data?: Signup[];
  isLoading?: boolean;
}) {
  const [rows, setRows] = useState<Signup[]>(data);
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "joined",
    direction: "desc",
  });
  const [pendingDelete, setPendingDelete] = useState<Signup | null>(null);

  const sortedRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = rows.filter((signup) =>
      [signup.name, signup.email, signup.company, signup.plan, signup.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );

    return [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const comparison =
        typeof aValue === "number" && typeof bValue === "number"
          ? aValue - bValue
          : String(aValue).localeCompare(String(bValue));

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [query, rows, sortConfig]);

  const onSort = (key: SortKey) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setRows((current) => current.filter((row) => row.id !== pendingDelete.id));
    toast.success(`${pendingDelete.name} was deleted`);
    setPendingDelete(null);
  };

  if (isLoading) {
    return <SignupsTableSkeleton />;
  }

  const isDatasetEmpty = rows.length === 0;
  const isSearchEmpty = !isDatasetEmpty && sortedRows.length === 0;
  const isFiltered = query.trim().length > 0;

  return (
    <>
      <Card className="min-w-0 rounded-xl border border-border bg-card shadow-xs">
        <CardHeader className="flex flex-col gap-4 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Recent signups
              </CardTitle>
              {isFiltered && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {sortedRows.length} of {rows.length}
                </span>
              )}
            </div>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Sort, search, and act on the latest 15 mock accounts.
            </CardDescription>
          </div>
          {isDatasetEmpty ? null : (
            <div className="relative w-full sm:w-72 md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70" aria-hidden="true" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search signups..."
                aria-label="Search signups"
                className="h-9.5 pl-9 pr-3 text-sm"
              />
              {isFiltered && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="overflow-x-auto pt-0">
          {isDatasetEmpty ? (
            <DashboardEmptyState
              icon={UserPlus}
              title="No signups yet"
              description="New accounts will appear here as they join this workspace."
              action={{ href: "/dashboard", label: "Explore Dashboard" }}
              className="min-h-[280px] border-0"
            />
          ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead aria-sort={sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}>
                  <SortButton label="Name" sortKey="name" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead aria-sort={sortConfig.key === "company" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}>
                  <SortButton label="Company" sortKey="company" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead aria-sort={sortConfig.key === "plan" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}>
                  <SortButton label="Plan" sortKey="plan" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead aria-sort={sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}>
                  <SortButton label="Status" sortKey="status" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead aria-sort={sortConfig.key === "joined" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}>
                  <SortButton label="Joined" sortKey="joined" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead className="text-right" aria-sort={sortConfig.key === "revenue" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}>
                  <SortButton label="Revenue" sortKey="revenue" sortConfig={sortConfig} onSort={onSort} align="right" />
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRows.map((signup) => (
                <TableRow key={signup.id} className="transition-colors">
                  <TableCell>
                    <div className="font-semibold text-foreground">{signup.name}</div>
                    <div className="text-xs text-muted-foreground">{signup.email}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{signup.company}</TableCell>
                  <TableCell className="font-medium text-foreground">{signup.plan}</TableCell>
                  <TableCell>
                    <StatusBadge status={signup.status} />
                  </TableCell>
                  <TableCell className="text-xs tabular-nums text-muted-foreground">{signup.joined}</TableCell>
                  <TableCell className="text-right font-semibold tabular-nums text-foreground">
                    ${signup.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="size-8 rounded-md text-muted-foreground hover:text-foreground"
                          aria-label={`Actions for ${signup.name}`}
                        >
                          <MoreHorizontal className="size-4" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onClick={() => toast.info(`Viewing ${signup.name}`)}
                        >
                          <Eye className="size-4 text-muted-foreground" aria-hidden="true" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onClick={() => toast.info(`Editing ${signup.name}`)}
                        >
                          <Pencil className="size-4 text-muted-foreground" aria-hidden="true" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => setPendingDelete(signup)}
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {isSearchEmpty ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-1.5 py-4">
                      <p className="text-sm font-medium text-foreground">No signups found</p>
                      <p className="text-xs text-muted-foreground">
                        No results matching &ldquo;{query}&rdquo;
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery("")}
                        className="mt-2 h-7 text-xs"
                      >
                        Clear search
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete signup?</DialogTitle>
            <DialogDescription>
              {pendingDelete
                ? `${pendingDelete.name} will be removed from the recent signups table.`
                : "This signup will be removed from the table."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="size-4 shrink-0" aria-hidden="true" />
              Delete signup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
