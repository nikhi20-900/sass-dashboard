import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PulseLogo } from "@/components/pulse-logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8">
        <PulseLogo size="md" href="/" />
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
