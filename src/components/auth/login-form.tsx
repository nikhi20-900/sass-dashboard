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
    <Card className="w-full max-w-md rounded-xl border border-border bg-card shadow-xs sm:shadow-sm">
      <CardHeader className="space-y-1.5 text-center pb-4 sm:pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Welcome back</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Sign in to your Pulse Analytics account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Quick Demo Accounts Selection */}
        <div className="rounded-xl border border-border bg-muted/40 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Sparkles className="size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              Quick Demo Accounts
            </span>
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">password123</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_ACCOUNTS.map((acc) => {
              const isSelected = demoSelected === acc.role;
              return (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleFillDemo(acc)}
                  className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
                    isSelected
                      ? "border-emerald-500/80 bg-emerald-500/10 text-foreground shadow-xs ring-1 ring-emerald-500/30"
                      : "border-border/80 bg-card hover:border-foreground/30 hover:bg-accent/50 text-foreground"
                  }`}
                >
                  <span className="text-xs font-semibold leading-tight">{acc.role}</span>
                  <span className="mt-0.5 text-[10px] text-muted-foreground">{acc.badge}</span>
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
            <div
              role="alert"
              className="flex items-center gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
            >
              <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
              <span className="font-medium">{state.error}</span>
            </div>
          ) : null}

          <div className="grid gap-1.5">
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
              <p id="login-email-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.email.message}</span>
              </p>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => handleFillDemo(DEMO_ACCOUNTS[0])}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password ? (
              <p id="login-password-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.password.message}</span>
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <label htmlFor="remember" className="flex items-center gap-2 cursor-pointer select-none text-xs text-muted-foreground hover:text-foreground transition-colors">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                defaultChecked
                className="size-4 rounded border-input text-primary focus:ring-2 focus:ring-ring/30 cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <span className="text-xs text-muted-foreground">Demo pw: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">password123</code></span>
          </div>

          <Button
            type="submit"
            className="h-10 w-full font-medium shadow-xs transition-all mt-1"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>Signing in...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <KeyRound className="size-4" aria-hidden="true" />
                <span>Sign in</span>
              </span>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground pt-1">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-foreground underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Create account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
