import { cn } from "~/lib/utils";

import { Label } from "./ui/label";

const TitleVariants: Record<string, string> = {
  h1: "text-5xl font-extrabold sm:text-[5rem]",
  h2: "text-4xl",
  h3: "text-3xl",
  h4: "text-2xl",
  h5: "text-xl",
  h6: "text-lg",
};

export type HProps = {
  children: string;
  variant?: keyof typeof TitleVariants;
  className?: string;
};

export default function H({ children, variant = "h1", className }: HProps) {
  return (
    <Label
      className={cn(
        "font-bold tracking-tight",
        TitleVariants[variant],
        className,
      )}
    >
      {children}
    </Label>
  );
}
