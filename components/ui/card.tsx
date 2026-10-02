import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hoverable = false }) => {
  return (
    <div
      className={`bg-[#16181D] border border-[#262930] rounded-lg p-5 ${
        hoverable ? "hover:border-[#363B47] hover:bg-[#1A1D24] transition-all duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
