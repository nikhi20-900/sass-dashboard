"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center p-4 sm:p-6" role="alert">
      <Card className="w-full max-w-md rounded-xl border border-border bg-card shadow-sm text-center">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <AlertCircle className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight text-foreground">
            Unable to load admin portal
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred while loading administrative settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button onClick={() => reset()} className="w-full sm:w-auto gap-2 shadow-xs">
            <RefreshCw className="size-4" aria-hidden="true" />
            <span>Try again</span>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/admin">Return to admin</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
