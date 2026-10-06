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
          <label className="block text-xs font-semibold text-stone-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs transition-colors ${
            error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500" : ""
          } ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-stone-500">{helperText}</p>
        )}
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
