import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "amber";
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
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D97706]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer tracking-tight";
  
  const variants = {
    primary: "bg-[#F0F2F5] text-[#0F1115] hover:bg-white font-semibold shadow-sm active:scale-[0.99]",
    amber: "bg-[#D97706] text-white hover:bg-[#F59E0B] font-medium shadow-sm active:scale-[0.99]",
    secondary: "bg-[#1E2128] text-[#F0F2F5] hover:bg-[#252932] border border-[#2B2F38]",
    outline: "bg-transparent text-[#F0F2F5] border border-[#262930] hover:bg-[#191C22] hover:border-[#363B47]",
    ghost: "bg-transparent text-[#8A8F9E] hover:text-[#F0F2F5] hover:bg-[#191C22]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
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
