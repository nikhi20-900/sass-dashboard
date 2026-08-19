"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LogOut,
  MoreVertical,
  Settings,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { getInitials } from "@/lib/utils";
import { getRoleLabel, type Role } from "@/lib/permissions/rbac";
import { getGroupedNavigationForRole } from "@/lib/permissions/navigation";
import { logoutUser } from "@/lib/actions/auth";
import { PulseLogo } from "@/components/pulse-logo";

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  organizationId: string | null;
  workspaceId: string | null;
}

function DashboardSidebar({ user }: { user: DashboardUser }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const { workspace, admin } = getGroupedNavigationForRole(user.role);

  const isRouteActive = (href: string) => {
    if (pathname === href) return true;
    if (href !== "/dashboard" && href !== "/admin" && pathname.startsWith(href + "/")) {
      return true;
    }
    return false;
  };

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" aria-label="Main Navigation">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              tooltip="Pulse Dashboard"
              className="h-10 px-2 rounded-lg hover:bg-sidebar-accent/70 transition-colors"
            >
              <Link href="/" onClick={handleNavClick} className="flex items-center gap-3">
                <PulseLogo size="sm" showText={false} />
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="font-semibold text-sm tracking-tight text-sidebar-foreground">
                    Pulse
                  </span>
                  <span className="text-[11px] text-muted-foreground font-normal">
                    Analytics & Ops
                  </span>
                </div>
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
              {workspace.map((item) => {
                const isActive = isRouteActive(item.href);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <item.icon aria-hidden="true" className="shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {admin.length > 0 ? (
          <SidebarGroup className="mt-1">
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {admin.map((item) => {
                  const isActive = isRouteActive(item.href);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link
                          href={item.href}
                          onClick={handleNavClick}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <item.icon aria-hidden="true" className="shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={`${user.name} (${getRoleLabel(user.role)})`}
              aria-label="User account and profile menu"
              className="w-full gap-3 rounded-lg border border-sidebar-border/60 bg-sidebar/50 p-2 hover:bg-sidebar-accent hover:border-sidebar-border/90 focus-visible:ring-2 focus-visible:ring-sidebar-ring transition-all"
            >
              <Avatar className="size-8 shrink-0 rounded-lg ring-1 ring-border/50">
                <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold text-sidebar-foreground">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground font-normal">
                  {getRoleLabel(user.role)}
                </span>
              </div>
              <MoreVertical
                className="size-4 shrink-0 text-muted-foreground/70 group-hover/menu-button:text-sidebar-foreground group-data-[collapsible=icon]:hidden transition-colors"
                aria-hidden="true"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" sideOffset={8} className="w-60 p-1.5">
            <DropdownMenuLabel className="p-2 font-normal">
              <div className="flex flex-col space-y-1">
                <p className="truncate text-sm font-semibold leading-none text-foreground">{user.name}</p>
                <p className="truncate text-xs leading-none text-muted-foreground">{user.email}</p>
                <div className="pt-1">
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {getRoleLabel(user.role)}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2 py-2">
              <Settings className="size-4 text-muted-foreground" aria-hidden="true" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer gap-2 py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
              onClick={() => {
                logoutUser();
              }}
            >
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function DashboardShell({
  user,
  children,
}: {
  user: DashboardUser;
  children: React.ReactNode;
}) {
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
          </div>
          <ThemeToggle />
        </header>
        <main id="main-content">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
