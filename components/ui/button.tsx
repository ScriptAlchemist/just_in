import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)_/0.9)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-[hsl(var(--destructive)_/0.9)]",
        outline:
          "px-4 border border-[hsl(var(--accent))] bg-white dark:bg-stone-800 hover:bg-stone-700 dark:hover:bg-stone-300 rounded-xl text-[hsl(var(--accent))]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-[hsl(var(--accent)/0.5)] bg-[hsl(var(--accent)/0.2)] dark:hover:bg-[hsl(var(--accent)/0.5)] dark:bg-[hsl(var(--accent)/0.3)] hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        unstyled: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
