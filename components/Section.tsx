import React from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  background?: "ink" | "panel" | "transparent";
}

export default function Section({
  id,
  className = "",
  children,
  background = "transparent",
}: SectionProps) {
  let bgClass = "";
  
  if (background === "panel") {
    bgClass = "bg-gray-100 dark:bg-panel";
  } else if (background === "ink") {
    bgClass = "bg-gray-50 dark:bg-ink";
  } else {
    bgClass = "bg-white dark:bg-transparent";
  }

  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 ${bgClass} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-6">{children}</div>
    </section>
  );
}