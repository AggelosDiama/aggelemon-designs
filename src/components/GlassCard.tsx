import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = ({ children, className, hover = false, glow = false }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300",
        hover && "hover:scale-[1.02] hover:shadow-xl cursor-pointer",
        glow && "lemon-glow-subtle hover:lemon-glow",
        className
      )}
    >
      {children}
    </div>
  );
};
