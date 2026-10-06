import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B8BDF]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm active:scale-[0.99]",
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200 border border-stone-200",
    outline: "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 hover:text-stone-900 hover:border-stone-400 shadow-xs",
    ghost: "bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
