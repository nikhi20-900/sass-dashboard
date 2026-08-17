import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 flex items-center gap-2" aria-label="Pulse logo">
        <span className="grid size-10 place-items-center rounded-lg bg-emerald-500 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25">
          P
        </span>
        <span className="text-xl font-semibold tracking-tight">Pulse</span>
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        The page you are looking for does not exist, has been moved, or you do not have permission to access it.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild variant="outline">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
