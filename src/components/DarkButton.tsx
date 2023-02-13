import React from "react";

export const DarkButton: React.FC<{
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}> = ({ children, className, type }) => {
  return (
    <button
      className={
        "h-8 p-5 text-white border bg-main-dark border-white inline-flex items-center hover:text-black hover:bg-white transition-colors duration-300" +
        " " +
        className
      }
      type={type}
    >
      {children}
    </button>
  );
};
