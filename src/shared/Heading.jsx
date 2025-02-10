import React from "react";

const Heading = ({ children, className, ...rest }) => {
  return (
    <h1
      className={`${className} not-last:font-semibold text-center 
      text-gray-700 md:text-3xl text-xl tracking-widest`}
      {...rest}
    >
      {children}
    </h1>
  );
};

export default Heading;
