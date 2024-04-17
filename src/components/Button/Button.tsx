import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, disabled, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        "rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
        disabled &&
          "bg-gray-400 text-gray-400 cursor-not-allowed hover:bg-gray-400 focus-visible:outline-gray-300 focus-visible:outline-offset-2 focus-visible:outline-offset-gray-300"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
