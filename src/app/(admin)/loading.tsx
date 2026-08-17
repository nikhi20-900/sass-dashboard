import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      <Skeleton className="h-10 w-48 rounded-md" />
      <Skeleton className="h-[500px] w-full rounded-xl" />
    </div>
  );
}
