import React from "react";

export const Wrapper = ({ children, className }) => {
  
  return (
    <div className="container mx-auto h-screen flex items-center justify-center px-2">
      <div className={`flex flex-col  w-[300px] md:w-[500px] rounded-lg shadow-lg items-center justify-center gap-3 py-8 px-3 ${className}`}>
        {children}
      </div>
    </div>
  );
};
