"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
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
import { registerUser, type AuthActionResult } from "@/lib/actions/auth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validators/auth";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState<
    AuthActionResult | undefined,
    FormData
  >(registerUser, undefined);

  const formRef = useRef<HTMLFormElement>(null);
  const isValidatedRef = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Card className="w-full max-w-md rounded-xl border border-border bg-card shadow-xs sm:shadow-sm">
      <CardHeader className="space-y-1.5 text-center pb-4 sm:pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Create account</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Get started with Pulse Analytics
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Alex Morgan"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "reg-name-error" : undefined}
              {...register("name")}
            />
            {errors.name ? (
              <p id="reg-name-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.name.message}</span>
              </p>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email" className="text-sm font-medium">Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "reg-email-error" : undefined}
              {...register("email")}
            />
            {errors.email ? (
              <p id="reg-email-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.email.message}</span>
              </p>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "reg-password-error" : undefined}
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
              <p id="reg-password-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.password.message}</span>
              </p>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? "reg-confirm-error" : undefined}
                className="pr-10"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 cursor-pointer"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.confirmPassword ? (
              <p id="reg-confirm-error" role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive pt-0.5">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.confirmPassword.message}</span>
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="h-10 w-full font-medium shadow-xs transition-all mt-1"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>Creating account...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserPlus className="size-4" aria-hidden="true" />
                <span>Create account</span>
              </span>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-foreground underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
