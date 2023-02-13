import React from "react";

export const DarkInput: React.FC<{
  className?: string;
  value?: string;
  placeholder?: string;
  onChange?: (...args: any[]) => void;
  type?: string;
  name?: string;
  id?: string;
}> = ({ className, value, placeholder, onChange, type, name, id }) => {
  return (
    <input
      className={
        "h-8 p-5 text-white placeholder:text-gray-200 border bg-main-dark border-white outline-none" +
        " " +
        className
      }
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      name={name}
      id={id}
    ></input>
  );
};
