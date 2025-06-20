import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative group p-[2px]", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          pointerEvents: "none",
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,hsl(var(--primary)),transparent),radial-gradient(circle_farthest-side_at_100%_0,hsl(var(--accent)),transparent),radial-gradient(circle_farthest-side_at_100%_100%,hsl(var(--muted)),transparent),radial-gradient(circle_farthest-side_at_0_0,hsl(var(--secondary)),hsl(var(--background)))]",
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          pointerEvents: "none",
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,hsl(var(--primary)),transparent),radial-gradient(circle_farthest-side_at_100%_0,hsl(var(--accent)),transparent),radial-gradient(circle_farthest-side_at_100%_100%,hsl(var(--muted)),transparent),radial-gradient(circle_farthest-side_at_0_0,hsl(var(--secondary)),hsl(var(--background)))]",
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
