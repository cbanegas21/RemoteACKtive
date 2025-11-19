import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  id?: string;
  variant?: "light" | "dark";
}

export default function Card({
  children,
  className = "",
  hover = false,
  onClick,
  id,
  variant = "light",
}: CardProps) {
  const baseStyles = variant === "dark"
    ? "bg-background-darkCard border-white/10 text-white"
    : "bg-white border-gray-200 shadow-sm";

  const hoverStyles = variant === "dark"
    ? "transition hover:border-primary-teal/30 hover:shadow-xl"
    : "transition hover:border-primary-teal/50 hover:shadow-lg";

  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-lg border p-6
        ${baseStyles}
        ${hover ? hoverStyles : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}