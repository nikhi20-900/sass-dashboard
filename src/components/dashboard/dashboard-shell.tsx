"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Home,
  LogOut,
  MoreHorizontal,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import type { Role } from "@prisma/client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recentSignups, stats, type Signup } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getRoleLabel } from "@/lib/permissions/rbac";
import { getGroupedNavigationForRole } from "@/lib/permissions/navigation";
import { logoutUser } from "@/lib/actions/auth";

interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  organizationId: string | null;
  workspaceId: string | null;
}

type SortKey = keyof Pick<
  Signup,
  "name" | "company" | "plan" | "status" | "joined" | "revenue"
>;

type SortConfig = {
  key: SortKey;
  direction: "asc" | "desc";
};

const profileSchema = z.object({
  name: z.string().min(2, "Enter at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().min(2, "Company is required."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function DashboardSidebar({ user }: { user: DashboardUser }) {
  const pathname = usePathname();
  const { workspace, admin } = getGroupedNavigationForRole(user.role);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Pulse">
              <Link href="/">
                <span className="grid size-8 place-items-center rounded-lg bg-emerald-500 text-sm font-semibold text-white">
                  P
                </span>
                <span className="font-semibold">Pulse</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspace.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {admin.length > 0 ? (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {admin.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="w-full">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.name} />
                <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <span className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {getRoleLabel(user.role)}
                </span>
              </span>
              <ChevronsUpDown className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="size-4" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logoutUser();
              }}
            >
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-lg">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-2xl">{stat.value}</CardTitle>
            <CardAction>
              <Badge
                variant="secondary"
                className={cn(
                  stat.positive
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                )}
              >
                {stat.positive ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                {stat.trend.split(" ")[0]}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {stat.trend}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SignupsTable() {
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
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <SortButton label="Name" sortKey="name" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead>
                  <SortButton label="Company" sortKey="company" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead>
                  <SortButton label="Plan" sortKey="plan" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead>
                  <SortButton label="Status" sortKey="status" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead>
                  <SortButton label="Joined" sortKey="joined" sortConfig={sortConfig} onSort={onSort} />
                </TableHead>
                <TableHead className="text-right">
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

function SettingsTabs({ user }: { user: DashboardUser }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      company: "Pulse Analytics",
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    toast.success(`Profile saved for ${values.name}`);
    form.reset(values);
  };

  return (
    <Card className="rounded-lg">
      <Tabs defaultValue="profile">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage workspace preferences and profile details.
          </CardDescription>
          <TabsList className="mt-4 w-fit">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="profile" className="mt-0">
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid max-w-xl gap-4">
              <div className="grid gap-2">
                <Label htmlFor="profile-name">Name</Label>
                <Input id="profile-name" {...form.register("name")} aria-invalid={Boolean(form.formState.errors.name)} />
                {form.formState.errors.name ? (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input id="profile-email" type="email" {...form.register("email")} aria-invalid={Boolean(form.formState.errors.email)} />
                {form.formState.errors.email ? (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-company">Company</Label>
                <Input id="profile-company" {...form.register("company")} aria-invalid={Boolean(form.formState.errors.company)} />
                {form.formState.errors.company ? (
                  <p className="text-sm text-destructive">{form.formState.errors.company.message}</p>
                ) : null}
              </div>
              <Button type="submit" className="w-fit">
                Save profile
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="workspace" className="mt-0 text-sm text-muted-foreground">
            Workspace defaults, roles, and access policies are ready for expansion.
          </TabsContent>
          <TabsContent value="alerts" className="mt-0 text-sm text-muted-foreground">
            Alert routing is configured for product, revenue, and success teams.
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

function DashboardContent({ user }: { user: DashboardUser }) {
  const firstName = user.name.split(" ")[0];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div className="grid gap-2">
        <Badge variant="outline" className="w-fit gap-1 border-emerald-500/40 text-emerald-700 dark:text-emerald-300">
          <Activity className="size-3" />
          Live workspace
        </Badge>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome back, {firstName}.
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {getRoleLabel(user.role)}
          </p>
          <p className="mt-2 text-muted-foreground">
            Your acquisition funnel is healthy, with revenue growth ahead of active sessions.
          </p>
        </div>
      </div>
      <StatCards />
      <SignupsTable />
      <SettingsTabs user={user} />
    </div>
  );
}

export function DashboardShell({
  user,
  children,
}: {
  user: DashboardUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardOverview = pathname === "/dashboard";

  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-xl sm:px-6">
          <SidebarTrigger />
          <Button asChild variant="ghost" size="icon" aria-label="Home">
            <Link href="/">
              <Home className="size-4" />
            </Link>
          </Button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-muted-foreground">Pulse dashboard</p>
            <h1 className="truncate text-base font-semibold">Growth overview</h1>
          </div>
          <ThemeToggle />
        </header>
        {isDashboardOverview ? <DashboardContent user={user} /> : children}
      </SidebarInset>
    </SidebarProvider>
  );
}
