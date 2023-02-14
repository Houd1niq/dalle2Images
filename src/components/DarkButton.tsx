import React from "react";
import { Link, To } from "react-router-dom";

export const DarkButton: React.FC<{
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  link?: {
    isLink: boolean;
    to: To;
  };
}> = ({ children, className, type, link }) => {
  if (link?.isLink) {
    return (
      <Link
        to={link.to}
        className={
          "min-h-8 px-5 py-2 text-white border bg-main-dark border-white inline-flex items-center hover:text-black hover:bg-white transition-colors duration-300" +
          " " +
          className
        }
        type={type}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={
        "min-h-8 px-5 py-2 text-white border bg-main-dark border-white inline-flex items-center hover:text-black hover:bg-white transition-colors duration-300" +
        " " +
        className
      }
      type={type}
    >
      {children}
    </button>
  );
};
