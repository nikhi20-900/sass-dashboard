"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LayoutDashboard, LogOut, Menu, Settings } from "lucide-react";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getInitials } from "@/lib/utils";
import { logoutUser } from "@/lib/actions/auth";
import { PulseLogo } from "@/components/pulse-logo";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Dashboard", href: "/dashboard" },
];

function UserMenu({ name, email }: { name: string; email: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`User menu for ${name}`}
        >
          <Avatar className="size-8">
            <AvatarImage src={`https://avatar.vercel.sh/${email}`} alt={name} />
            <AvatarFallback className="text-xs font-semibold">{getInitials(name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold leading-none">{name}</span>
            <span className="text-xs text-muted-foreground truncate">{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
            <LayoutDashboard className="size-4 text-muted-foreground" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
            <Settings className="size-4 text-muted-foreground" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logoutUser();
          }}
          className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer flex items-center gap-2"
        >
          <LogOut className="size-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated" && session?.user;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-xs backdrop-blur-xl"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <PulseLogo href="/" size="sm" />
          <nav aria-label="Main Navigation" className="hidden items-center gap-1 text-sm font-medium text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />
          {isLoading ? (
            <Skeleton className="size-8 rounded-full" />
          ) : isAuthenticated ? (
            <UserMenu
              name={session.user.name ?? "User"}
              email={session.user.email ?? ""}
            />
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="font-medium">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="font-medium shadow-xs">
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu and actions */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          {isLoading ? (
            <Skeleton className="size-8 rounded-full" />
          ) : isAuthenticated ? (
            <UserMenu
              name={session.user.name ?? "User"}
              email={session.user.email ?? ""}
            />
          ) : null}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-lg"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-80 flex-col p-6">
              <SheetHeader className="text-left pb-4 border-b border-border/60">
                <SheetTitle>
                  <PulseLogo size="sm" />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu and options for Pulse
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile Navigation" className="mt-6 flex flex-1 flex-col gap-1.5">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="h-10 justify-start text-base font-medium"
                    onClick={() => setSheetOpen(false)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
                <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-border/60">
                  {isAuthenticated ? (
                    <Button asChild className="w-full shadow-xs" onClick={() => setSheetOpen(false)}>
                      <Link href="/dashboard">Open dashboard</Link>
                    </Button>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full"
                        onClick={() => setSheetOpen(false)}
                      >
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full shadow-xs"
                        onClick={() => setSheetOpen(false)}
                      >
                        <Link href="/register">Get started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
