/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import Loader from "../loader";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors w-fit",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // focus
    "disabled:pointer-events-none disabled:opacity-70", // disabled
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border border-border/15 hover:bg-border/10",
        secondary: "bg-secondary text-secondary-foreground hover:bg-card",
        success:
          "bg-success text-success-foreground hover:bg-success/75 outline outline-1 outline-success/30 border-[3px] border-secondary",
        successOutline:
          "border border-success/50 text-success hover:bg-success/30",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/75 outline outline-1 outline-warning/30 border-[3px] border-secondary",
        warningOutilne:
          "border border-warning/50 text-warning hover:bg-warning/30",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 outline outline-1 outline-destructive/30 border-[3px] border-secondary",
        destructiveOutilne:
          "border border-destructive/50 text-destructive hover:bg-destructive/30",
        ghost: "hover:bg-secondary/30",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3 md:h-10 md:px-4 md:py-2 lg:h-11 lg:px-8",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

const content = (
  children: React.ReactNode,
  hasIcon?: {
    icon: React.ReactNode;
    iconPosition: "left" | "right";
  },
) => {
  if (hasIcon?.icon) {
    const { icon, iconPosition } = hasIcon;
    return (
      <div className="flex flex-row items-center justify-center gap-3">
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </div>
    );
  }
  return children;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      asChild = false,
      disabled,
      icon,
      iconPosition = "left",
      loading,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isLoaderWhite =
      variant?.includes("success") ||
      variant?.includes("warning") ||
      variant?.includes("destructive");
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span
              className={
                "invisible relative inline-flex items-center justify-center rounded-md !leading-none transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none"
              }
            >
              {children}
            </span>
            <div className="absolute flex h-8 w-8 items-center justify-center gap-2">
              <Loader className={cn(isLoaderWhite && "loader-white")} />
            </div>
          </>
        ) : (
          content(children, { icon, iconPosition })
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
