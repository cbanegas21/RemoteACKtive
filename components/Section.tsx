import React from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  background?: "light" | "white" | "transparent" | "dark";
}

export default function Section({
  id,
  className = "",
  children,
  background = "transparent",
}: SectionProps) {
  let bgClass = "";

  if (background === "light") {
    bgClass = "bg-background-light";
  } else if (background === "white") {
    bgClass = "bg-white";
  } else if (background === "dark") {
    bgClass = "bg-background-dark";
  } else {
    bgClass = "bg-transparent";
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