"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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

type SortKey = keyof Pick<
  Signup,
  "name" | "company" | "plan" | "status" | "joined" | "revenue"
>;

type SortConfig = {
  key: SortKey;
  direction: "asc" | "desc";
};

function statusVariant(status: Signup["status"]) {
  if (status === "Active") return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  if (status === "Trial") return "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300";
  return "bg-amber-500/10 text-amber-700 dark:text-amber-300";
}

function SortButton({
  label,
  sortKey,
  sortConfig,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  sortConfig: SortConfig;
  onSort: (key: SortKey) => void;
}) {
  const active = sortConfig.key === sortKey;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2"
      onClick={() => onSort(sortKey)}
      aria-label={`Sort by ${label}`}
    >
      {label}
      {active && sortConfig.direction === "asc" ? (
        <ArrowUp className="size-3" />
      ) : active ? (
        <ArrowDown className="size-3" />
      ) : (
        <ChevronsUpDown className="size-3 opacity-50" />
      )}
    </Button>
  );
}

export function SignupsTable() {
  const [rows, setRows] = useState<Signup[]>(recentSignups);
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

  return (
    <>
      <Card className="rounded-lg">
        <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Recent signups</CardTitle>
            <CardDescription>
              Sort, search, and act on the latest 15 mock accounts.
            </CardDescription>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search signups..."
              aria-label="Search signups"
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
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
                  <SortButton label="Revenue" sortKey="revenue" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRows.map((signup) => (
                <TableRow key={signup.id}>
                  <TableCell>
                    <div className="font-medium">{signup.name}</div>
                    <div className="text-xs text-muted-foreground">{signup.email}</div>
                  </TableCell>
                  <TableCell>{signup.company}</TableCell>
                  <TableCell>{signup.plan}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusVariant(signup.status)}>
                      {signup.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{signup.joined}</TableCell>
                  <TableCell className="text-right">
                    ${signup.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${signup.name}`}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.info(`Viewing ${signup.name}`)}>
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info(`Editing ${signup.name}`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setPendingDelete(signup)}
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {sortedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No signups match your search.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete signup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
