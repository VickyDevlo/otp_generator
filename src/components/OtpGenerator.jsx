import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Heading, Input, Button } from "../shared";
import { toast } from "react-toastify";

export const OtpGenerator = ({
  setStep,
  generateOtp,
  setGeneratedOtp,
  generatedOtp,
}) => {
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
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
    const enteredOtp = inputs.join("").trim();
    const otpString = String(generatedOtp).trim();

    if (!otpString || otpString.length !== 6) {
      setError(true);
      return;
    }

    if (enteredOtp.length !== 6) {
      setError(true);
      toast.error("Please enter a 6-digit OTP.");
      return;
    }

    if (enteredOtp === otpString) {
      setIsVerified(true);
      setTimeout(() => {
        setInputs(Array(6).fill(""));
        setIsVerified(false);
        setStep(3);
      }, 1500);
    } else {
      setError(true);
      setFailedAttempts((prev) => prev + 1);

      if (failedAttempts + 1 === 3) {
        setTimeout(() => {
          toast.error("Failed attempt. Please wait a moment and try again");
          setInputs(Array(6).fill(""));
          setStep(1);
          setFailedAttempts(0);
        }, 500);
      } else {
        setTimeout(() => {
          setInputs(Array(6).fill(""));
          inputRefs.current[0]?.focus();
        }, 500);
      }
    }
  };

  const sendCode = () => {
    const newCode = generateOtp();
    setGeneratedOtp(newCode);
    toast.success(`New OTP is - ${newCode}`);
    setInputs(Array(6).fill(""));
    setError(false);
    setFailedAttempts(0);
    setTimeout(() => inputRefs.current[0]?.focus(), 200);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col items-center gap-2">
        <Heading>OTP Verification</Heading>
        <p className="text-center max-sm:text-xs text-sm text-gray-500 tracking-widest px-3">
          Code was sent to your email
        </p>
      </div>

      <div className="flex gap-1 md:gap-3 items-center">
        {inputs.map((value, i) => (
          <Input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            maxLength={1}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            autoComplete="off"
            className="text-2xl md:text-5xl text-gray-600 text-center border-b border-gray-300 w-10 h-12 md:w-14 md:h-16 caret-transparent focus:border-b-2 focus:border-green-300 outline-none transition-all"
          />
        ))}
      </div>

      {error && failedAttempts <= 2 ? (
        <p className="text-red-500 text-center tracking-widest">
          Invalid OTP. Please try again.
        </p>
      ) : isVerified ? (
        <p className="text-green-500 text-center tracking-widest">
          Verification Successful!
        </p>
      ) : null}

      {failedAttempts > 0 && failedAttempts < 3 && !isVerified && (
        <p
          className={`text-gray-600 tracking-widest  ${
            failedAttempts === 2 ? "text-red-500" : ""
          }`}
        >
          Attempt left - {3 - failedAttempts}
        </p>
      )}
      <Button
        isDisabled={inputs.includes("") || failedAttempts >= 3}
        onClick={verifyCode}
        className="mt-2"
      >
        Verify Code
      </Button>

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
    </Wrapper>
  );
};
