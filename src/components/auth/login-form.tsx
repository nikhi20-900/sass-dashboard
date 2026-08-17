"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, KeyRound, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser, type AuthActionResult } from "@/lib/actions/auth";
import { loginSchema, type LoginFormValues } from "@/lib/validators/auth";

const DEMO_ACCOUNTS = [
  {
    role: "Super Admin",
    name: "Nikhil",
    email: "nikhil@pulse.demo",
    password: "password123",
    badge: "Full Access",
  },
  {
    role: "Manager",
    name: "Maya",
    email: "maya@pulse.demo",
    password: "password123",
    badge: "Workspace",
  },
  {
    role: "Viewer",
    name: "Alex",
    email: "viewer@pulse.demo",
    password: "password123",
    badge: "Read Only",
  },
] as const;

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<
    AuthActionResult | undefined,
    FormData
  >(loginUser, undefined);

  const formRef = useRef<HTMLFormElement>(null);
  const isValidatedRef = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [demoSelected, setDemoSelected] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFillDemo = (account: typeof DEMO_ACCOUNTS[number]) => {
    setValue("email", account.email, { shouldValidate: true });
    setValue("password", account.password, { shouldValidate: true });
    clearErrors();
    setDemoSelected(account.role);
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-border/80">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
        <CardDescription>
          Sign in to your Pulse Analytics account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Quick Demo Accounts Selection */}
        <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold flex items-center gap-1.5 text-foreground">
              <Sparkles className="size-3.5 text-emerald-500" />
              Quick Demo Accounts
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">password123</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {DEMO_ACCOUNTS.map((acc) => {
              const isSelected = demoSelected === acc.role;
              return (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleFillDemo(acc)}
                  className={`flex flex-col items-start p-2 rounded-md border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm"
                      : "border-border/60 bg-background hover:border-emerald-500/50 hover:bg-accent/50 text-foreground"
                  }`}
                >
                  <span className="text-xs font-semibold leading-tight">{acc.role}</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">{acc.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form
          ref={formRef}
          action={formAction}
          onSubmit={(e) => {
            if (isValidatedRef.current) {
              isValidatedRef.current = false;
              return;
            }

            e.preventDefault();
            handleSubmit(() => {
              isValidatedRef.current = true;
              formRef.current?.requestSubmit();
            })();
          }}
          className="grid gap-4"
        >
          {state?.error ? (
            <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          ) : null}

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              {...register("email")}
            />
            {errors.email ? (
              <p id="login-email-error" className="text-xs text-destructive flex items-center gap-1 mt-0.5">
                <AlertCircle className="size-3 shrink-0" />
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => handleFillDemo(DEMO_ACCOUNTS[0])}
                className="text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              >
                Use demo admin
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "login-password-error" : undefined}
                className="pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password ? (
              <p id="login-password-error" className="text-xs text-destructive flex items-center gap-1 mt-0.5">
                <AlertCircle className="size-3 shrink-0" />
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                defaultChecked
                className="size-4 rounded border-input text-emerald-600 focus:ring-emerald-500"
              />
              <Label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer font-normal">
                Remember me
              </Label>
            </div>
            <span className="text-xs text-muted-foreground">Demo pw: <code className="font-mono text-emerald-600 dark:text-emerald-400">password123</code></span>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <KeyRound className="size-4" />
                Sign in
              </span>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground pt-1">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4"
          >
            Create account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
