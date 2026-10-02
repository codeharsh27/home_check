import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "emerald";
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
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white hover:from-[#3B82F6] hover:to-[#2563EB] shadow-lg shadow-[#2563EB]/20 border border-blue-400/20",
    emerald: "bg-gradient-to-r from-[#059669] to-[#047857] text-white hover:from-[#10B981] hover:to-[#059669] shadow-lg shadow-[#10B981]/20 border border-emerald-400/20",
    secondary: "bg-[#1F2937] text-[#F9FAFB] hover:bg-[#374151] border border-[#374151]",
    outline: "bg-transparent text-[#F9FAFB] border border-[#374151] hover:bg-[#1F2937] hover:border-[#4B5563]",
    ghost: "bg-transparent text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-4.5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
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
