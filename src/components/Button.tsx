import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function Button({ onClick, className, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-white font-bold transition-transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
}
