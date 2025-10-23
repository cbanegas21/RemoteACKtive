import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  id?: string;
}

export default function Card({
  children,
  className = "",
  hover = false,
  onClick,
  id,
}: CardProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-lg border p-6 
        bg-white dark:bg-panel 
        border-gray-200 dark:border-white/10 
        shadow-sm dark:shadow-none
        ${hover ? "transition hover:border-blue-500/50 hover:shadow-lg" : ""} 
        ${onClick ? "cursor-pointer" : ""} 
        ${className}`}
    >
      {children}
    </div>
  );
}