import React from "react";
import { Wrapper } from "./Wrapper";
import { HiBadgeCheck } from "react-icons/hi";

export const SuccsessModel = ({ setShowModel }) => {
  return (
    <Wrapper>
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-semibold text-gray-700 max-sm:text-2xl text-4xl tracking-widest">
          Congratulation
        </h1>
        <p className="text-center max-sm:text-xs text-lg text-gray-500 tracking-widest px-3">
          Welcome back
        </p>
      </div>
      <div>
        <HiBadgeCheck className="text-emerald-600 size-32 md:size-40" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-semibold text-gray-700 max-sm:text-xl text-3xl tracking-widest">
          Thank you
        </h1>
        <p className="text-center max-sm:text-xs text-lg text-gray-500 tracking-widest px-3">
          Your OTP Verification has been completed successfully!
        </p>
      </div>
      <button
        onClick={() => setShowModel(false)}
        className="text-white bg-blue-500 px-4 py-1 rounded text-md 
          tracking-wider cursor-pointer"
      >
        Back
      </button>
    </Wrapper>
  );
};
