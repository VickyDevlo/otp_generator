import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

export const OtpGenerator = () => {
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    if (value && index < inputs.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const isDisabled = inputs.some((input) => input === "") || isVerifying;

  const verifyCode = () => {
    setIsVerifying(true);
    toast.success("Code Verified Successfully...");

    setTimeout(() => {
      setInputs(Array(6).fill(""));
      setIsVerifying(false);
    }, 3000);
  };

  const sendCode = () => {
    toast.dark("Code send to your email");
    setInputs(Array(6).fill(""));
  };

  return (
    <div className="container mx-auto h-screen flex items-center justify-center px-2">
      <div className=" flex flex-col bg-white md:w-[550px] rounded-lg shadow-2xl items-center justify-center gap-6  py-10 px-3">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-semibold text-gray-800 max-sm:text-3xl text-4xl tracking-widest">
            Verify
          </h1>
          <p className=" text-center max-sm:text-lg text-xl text-gray-500 tracking-widest px-3">
            Code was sent to you via email
          </p>
        </div>

        <div className="flex gap-1 items-center">
          {inputs.map((value, i) => (
            <input
              key={i}
              ref={(e) => (inputRefs.current[i] = e)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={value}
              maxLength={1}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="text-xl md:text-2xl text-center border-gray-300 border-2 rounded-lg w-10 h-12 md:w-14 md:h-16 focus:outline-0"
            />
          ))}
        </div>

        <button
          disabled={isDisabled}
          onClick={verifyCode}
          className={`text-white px-4 py-1 rounded text-xl cursor-pointer transition-all duration-300 tracking-wider ${
            isVerifying ? "bg-green-600" : "bg-blue-700"
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {isVerifying ? "Verified" : "Verify"}
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
      </div>
    </div>
  );
};
