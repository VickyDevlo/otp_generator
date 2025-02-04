import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { SuccsessModel } from "./SuccsessModel";
import { Wrapper } from "./Wrapper";

export const OtpGenerator = ({ setShowModel }) => {
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    if (value && index < inputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "Enter") {
      if (!inputs.includes("")) {
        verifyCode();
      }
    }
  };

  const verifyCode = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setInputs(Array(6).fill(""));
      setShowSuccess(false);
      inputRefs.current[0]?.focus();
      setShowModel(true);
    }, 3000);
  };

  const sendCode = () => {
    toast.success("Code sent to your email");
    setInputs(Array(6).fill(""));
    setTimeout(() => inputRefs.current[0]?.focus(), 200);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-semibold text-gray-700 max-sm:text-2xl text-4xl tracking-widest">
          OTP Verification
        </h1>
        <p className="text-center max-sm:text-xs text-lg text-gray-500 tracking-widest px-3">
          Code was sent to your email
        </p>
      </div>

      <div className="flex gap-1 items-center">
        {inputs.map((value, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            maxLength={1}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            autoComplete="off"
            className="text-xl md:text-2xl text-center border-gray-300 border-2 rounded-lg w-10 h-12 md:w-14 md:h-16 caret-transparent focus:ring-2 focus:ring-green-300 outline-none transition-all"
          />
        ))}
      </div>

      {showSuccess && (
        <p className="text-green-600 tracking-widest transition-all duration-500 opacity-100 translate-y-0">
          Verification Successful!
        </p>
      )}

      <button
        disabled={inputs.includes("")}
        onClick={verifyCode}
        className="text-white bg-blue-500 px-4 py-1 rounded text-md 
          tracking-wider cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        Verify Code
      </button>

      <div className="text-center">
        <p className="text-gray-500 text-lg">
          Didn't receive code?
          <span
            className="text-blue-500 underline cursor-pointer text-lg ml-1"
            onClick={sendCode}
          >
            send again
          </span>
        </p>
      </div>
    </Wrapper>
  );
};
