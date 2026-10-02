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
    primary: "bg-[#5B8BDF] text-white hover:bg-[#6E9BE8] shadow-sm active:scale-[0.99]",
    secondary: "bg-[#222222] text-[#EDEDED] hover:bg-[#2A2A2A] border border-[#333333]",
    outline: "bg-transparent text-[#EDEDED] border border-[#333333] hover:bg-[#1A1A1A] hover:border-[#444444]",
    ghost: "bg-transparent text-[#888888] hover:text-[#EDEDED] hover:bg-[#1A1A1A]",
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
