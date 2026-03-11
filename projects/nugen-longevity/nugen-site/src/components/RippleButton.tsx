"use client";

import { useRef, MouseEvent, ReactNode } from "react";

interface RippleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  variant?: "primary" | "glass";
}

export default function RippleButton({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
}: RippleButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = "ripple-effect";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onClick?.();
  };

  const base = "btn-ripple btn-glow relative font-semibold rounded-xl text-base transition-all duration-300 font-satoshi flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-accent text-primary px-8 py-3.5 hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(0,212,170,0.35)] hover:scale-[1.02] active:scale-[0.98]",
    glass: "glass text-white px-8 py-3.5 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(0,212,170,0.1)] hover:scale-[1.02] active:scale-[0.98]",
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
