import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const toastVariants = cva(
  "pointer-events-auto flex items-center justify-between rounded-md border border-border bg-background p-3 shadow-lg",
  {
    variants: {
      variant: {
        default: "border border-border bg-background",
        destructive:
          "border border-destructive bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, open, onOpenChange, ...props }, ref) => (
    <ToastPrimitives.Root
      ref={ref}
      className={toastVariants({ className, variant })}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    />
  ),
);
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className="text-sm font-semibold text-[hsl(var(--foreground))]"
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className="text-sm text-[hsl(var(--muted-foreground))]"
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 rounded"
    {...props}
  />
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastProvider = ({ children }: { children: React.ReactNode }) => (
  <ToastPrimitives.Provider swipeDirection="right">
    {children}
    <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-[100] flex flex-col p-4 gap-2 max-w-md w-full list-none outline-none" />
  </ToastPrimitives.Provider>
);

export {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
