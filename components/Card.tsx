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
        bg-white border-gray-200 shadow-sm
        ${hover ? "transition hover:border-primary-teal/50 hover:shadow-lg" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}