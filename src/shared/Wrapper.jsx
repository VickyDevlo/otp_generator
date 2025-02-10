import React from "react";

const Wrapper = ({ children, className, ...rest }) => {
  return (
    <div className="container mx-auto h-96 md:h-screen flex items-center justify-center px-2">
      <div
        className={`${className} flex flex-col bg-white w-[300px] md:w-[500px] rounded-lg border border-gray-200 shadow-lg items-center justify-center 
        gap-3 py-8 px-3`}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
