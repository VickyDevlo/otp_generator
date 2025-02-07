import React, { forwardRef } from "react";

export const Input = forwardRef(
  (
    {
      type,
      name,
      placeholder,
      inputMode,
      pattern,
      value,
      onChange,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        value={value}
        onChange={onChange}
        className={`${className}  font-medium text-gray-700 
        p-2  w-full mb-3 focus:outline-0 `}
        {...rest}
      />
    );
  }
);
