import { cn } from "~/lib/utils";

export default function Loader({ className }: { className?: string }) {
  return <span className={cn("loader", className)} />;
}
