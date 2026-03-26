"use client";

import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import cn from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode; // new
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="mb-4 relative">
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-300 dark:text-gray-200">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
          <input
            ref={ref}
            {...props}
            className={cn(
              "w-full px-10 py-2 rounded-md border bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary",
              error ? "border-red-500 focus:ring-red-500" : "border-gray-700",
              className
            )}
          />
        </div>
        {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;