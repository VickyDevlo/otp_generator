import React from "react";

const Button = ({ children, isDisabled, onClick, className, ...rest }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${className} flex items-center justify-center gap-1 text-white
  bg-blue-500 px-3 py-1 rounded text-md tracking-wider cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
