import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Wrapper } from "./Wrapper";
import { BsArrowLeftShort } from "react-icons/bs";

export const OtpGenerator = ({
  setStep,
  generateOtp,
  setGeneratedOtp,
  generatedOtp,
}) => {
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [isverified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    let newInputs = [...inputs];

    if (value.length === 6) {
      newInputs = value.split("").slice(0, 6);
    } else {
      newInputs[index] = value;
    }

    setInputs(newInputs);
    setError(false);

    if (value && index < inputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!inputs[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newInputs = [...inputs];
        newInputs[index - 1] = "";
        setInputs(newInputs);
      }
    }
    if (e.key === "Enter" && !inputs.includes("")) {
      verifyCode();
    }
  };

  const verifyCode = () => {
    const enteredOtp = inputs.join("");
    const otpString = String(generatedOtp);

    if (enteredOtp === otpString) {
      setIsVerified(true);
      setTimeout(() => {
        setInputs(Array(6).fill(""));
        setIsVerified(false);
        setStep(3);
      }, 1500);
    } else {
      setTimeout(() => {
        setError(true);
        setInputs(Array(6).fill(""));
        inputRefs.current[0].focus();
      }, 1500);
    }
  };

  const sendCode = () => {
    const newCode = generateOtp();
    setGeneratedOtp(newCode);
    toast.success(`New OTP is - ${newCode}`);
    setInputs(Array(6).fill(""));
    setError("");
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

      {error ? (
        <p className="text-red-500 tracking-widest transition-all duration-500 opacity-100 translate-y-0">
          Invalid OTP. Please try again.
        </p>
      ) : isverified ? (
        <p className="text-green-500 tracking-widest transition-all duration-500 opacity-100 translate-y-0">
          Verification Successful!
        </p>
      ) : null}

      <button
        disabled={inputs.includes("")}
        onClick={verifyCode}
        className="text-white bg-blue-500 my-3 px-4 py-1 rounded text-md 
          tracking-wider cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        Verify Code
      </button>

      <div className="text-center">
        <p className="text-gray-500 md:text-lg text-sm">
          Didn't receive code?
          <span
            className="text-blue-500 underline cursor-pointer ml-1"
            onClick={sendCode}
          >
            send again
          </span>
        </p>
      </div>

      <button
        className="flex items-center gap-1 text-white bg-red-400 my-2 px-4 py-1 rounded text-md 
          tracking-wider cursor-pointer transition-all"
        onClick={() => setStep(1)}
      >
        <BsArrowLeftShort size={20} />
        Back
      </button>
    </Wrapper>
  );
};
