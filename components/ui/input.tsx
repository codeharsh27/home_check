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
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8A8F9E]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-[#14161B] border border-[#262930] text-[#F0F2F5] placeholder-[#525866] rounded-md px-3.5 py-2 text-sm focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]/40 transition-colors ${
            error ? "border-[#EF4444]" : ""
          } ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-[#6B7280]">{helperText}</p>
        )}
        {error && <p className="text-xs text-[#EF4444]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
