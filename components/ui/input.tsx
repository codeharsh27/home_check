import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-[#181818] border border-[#2B2B2B] text-[#EDEDED] placeholder-[#555555] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5B8BDF] focus:ring-1 focus:ring-[#5B8BDF] transition-colors ${
            error ? "border-[#D94F4F]" : ""
          } ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-[#666666]">{helperText}</p>
        )}
        {error && <p className="text-xs text-[#D94F4F]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
