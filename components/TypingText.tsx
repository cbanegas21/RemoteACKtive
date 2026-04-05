"use client";
import { useState, useEffect } from "react";

const roles = [
  "Software Developers",
  "Digital Marketers",
  "Executive Assistants",
  "Customer Support",
  "UI/UX Designers",
  "Finance Experts",
  "Content Creators",
  "HR Specialists",
];

export default function TypingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[index];

    if (!deleting && displayed === target) {
      const t = setTimeout(() => setDeleting(true), 2400);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }

    const speed = deleting ? 38 : 72;
    const t = setTimeout(() => {
      setDisplayed(
        deleting
          ? target.slice(0, displayed.length - 1)
          : target.slice(0, displayed.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, index]);

  return (
    <>
      <span className="text-[#a8e8f5]">{displayed}</span>
      <span className="typing-cursor text-white/40">|</span>
    </>
  );
}
