import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PulseLogo } from "@/components/pulse-logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center sm:p-6" role="alert">
      <div className="mb-6">
        <PulseLogo size="md" href="/" />
      </div>
      <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4 ring-1 ring-border/60">
        <FileQuestion className="size-7" aria-hidden="true" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-2">
        Page not found
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-md leading-relaxed">
        The page you are looking for does not exist, has been moved, or you do not have permission to access it.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="outline" className="min-w-32">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild className="min-w-32 shadow-xs">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
