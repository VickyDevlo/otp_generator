import React from "react";
import { Wrapper, Heading } from "../shared";
import { HiBadgeCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export const SuccessModel = ({ userData, setStep }) => {
  return (
    <Wrapper className="relative">
      <button
        onClick={() => setStep(1)}
        className="absolute top-1 md:top-4 right-2 md:right-4 cursor-pointer"
      >
        <IoClose size={24} />
      </button>
      <div className="flex flex-col items-center gap-2">
        <Heading>Congratulation</Heading>
        <p className="text-center font-semibold max-sm:text-xs text-lg text-gray-700 tracking-widest px-3 capitalize">
          {userData.name}
        </p>
      </div>
      <div>
        <HiBadgeCheck className="text-green-500 size-32 md:size-40" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-center max-sm:text-xs text-lg text-gray-500 tracking-widest px-3">
          Your OTP Verification has been completed successfully!
        </p>
      </div>
    </Wrapper>
  );
};
