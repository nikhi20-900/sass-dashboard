import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>
  );
}
