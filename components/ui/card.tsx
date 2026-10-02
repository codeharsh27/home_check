import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hoverable = false }) => {
  return (
    <div
      className={`bg-[#141414] border border-[#252525] rounded-xl p-5 ${
        hoverable ? "hover:border-[#333333] hover:bg-[#181818] transition-all duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
