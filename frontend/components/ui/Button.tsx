"use client";

import { ButtonHTMLAttributes, FC } from "react";
import cn from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className,
  ...props
}) => {
  const base = "px-6 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-[#4f46e5] text-white hover:bg-[#4f46e5]/90 disabled:opacity-60 dark:bg-primary dark:hover:bg-primary/90",
    secondary:
      "bg-[#f59e0b] text-white hover:bg-[#f59e0b]/90 disabled:opacity-60 dark:bg-secondary dark:hover:bg-secondary/90",
    outline:
      "border border-white text-white hover:bg-white/10 disabled:opacity-60",
    ghost: "bg-transparent text-white hover:bg-white/20 disabled:opacity-60",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;