import { ImageWithFallback } from "~/components/image-with-fallback";
import { Skeleton } from "~/components/ui/skeleton";

export default function GridSkeleton() {
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array(10)
        .fill(0)
        .map((_) => (
          <div
            key={`${_}`}
            className={
              "relative flex flex-col rounded-xl border border-white/20 bg-card"
            }
          >
            <div className="relative">
              <ImageWithFallback src="" />
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-2">
                <Skeleton className="h-4 w-32 rounded-full bg-card text-center" />
                <Skeleton className="h-4 w-10 rounded-full bg-card text-center" />
                <Skeleton className="h-4 w-20 rounded-full bg-card text-center" />
              </div>
              <div className="absolute right-4 top-4">
                <Skeleton className="h-6 w-6 rounded-full bg-card" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
