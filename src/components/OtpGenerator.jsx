import { useContext, useEffect, useRef, useState } from "react";
import { Wrapper, Heading, Input, Button } from "../shared";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

export const OtpGenerator = () => {
  const { setStep, generatedOtp, generateOtp, setGeneratedOtp } =
    useContext(AppContext);

  const [inputs, setInputs] = useState(Array(5).fill(""));
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [coolDown, setCoolDown] = useState(0);

  const inputRefs = useRef([]);

  const resetInputs = () => {
    setInputs(Array(5).fill(""));
    setTimeout(() => inputRefs.current[0]?.focus(), 200);
  };

  const resetOtp = () => {
    setGeneratedOtp(null);
    resetInputs();
    setFailedAttempts(0);
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    let newInputs = [...inputs];

    if (value.length === 5) {
      newInputs = value.split("").slice(0, 5);
    } else {
      newInputs[index] = value;
    }

    setInputs(newInputs);
    setError(false);

    if (value && index < inputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pastedData)) return;

    const otpArray = pastedData.split("").slice(0, 5);
    setInputs((prev) => {
      const newInputs = [...prev];
      otpArray.forEach((digit, i) => {
        if (i < newInputs.length) newInputs[i] = digit;
      });
      return newInputs;
    });

    const lastIndex = Math.min(otpArray.length, 5) - 1;
    inputRefs.current[lastIndex]?.focus();
    setError(false);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newInputs = [...inputs];
      newInputs[index - 1] = "";
      setInputs(newInputs);
    }
    if (e.key === "Enter" && !inputs.includes("")) {
      verifyCode();
    }
  };

  const verifyCode = () => {
    const enteredOtp = inputs.join("").trim();

    if (!generatedOtp || generatedOtp.length !== 5) {
      setError(true);
      toast.error("OTP not generated");
      resetInputs();
      return;
    }

    if (enteredOtp.length !== 5) {
      setError(true);
      toast.error("Please enter a 5-digit OTP.");
      return;
    }

    if (enteredOtp === generatedOtp) {
      setIsVerified(true);
      setError(false);
      setFailedAttempts(0);
      setGeneratedOtp(null);
      setTimeout(() => {
        resetInputs();
        setStep(2);
      }, 1500);
    } else {
      setError(true);
      setFailedAttempts((prev) => prev + 1);

      if (failedAttempts + 1 === 3) {
        toast.error("Too many failed attempts. Please try again.");
        resetOtp();
      } else {
        setTimeout(() => resetInputs(), 500);
      }
    }
  };

  const sendCode = () => {
    if (coolDown > 0) return;

    const newCode = generateOtp();
    setGeneratedOtp(newCode);

    toast.success(`New OTP generated: ${newCode}`);
    resetInputs();
    setError(false);
    setFailedAttempts(0);
    setCoolDown(30);
  };

  useEffect(() => {
    if (coolDown > 0) {
      const timer = setTimeout(() => setCoolDown(coolDown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [coolDown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col items-center gap-2">
        <Heading>OTP Verification</Heading>
        <p className="text-center max-sm:text-xs text-sm text-gray-500 tracking-widest px-3">
          Click "Send the code" to receive a 5-digit OTP
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
            onPaste={handlePaste}
            autoComplete="off"
            className="text-xl md:text-3xl text-gray-600 text-center border border-gray-300 w-10 h-12 md:w-14 md:h-16 caret-transparent rounded-lg focus:border-2 focus:border-green-300 outline-none transition-all"
          />
        ))}
      </div>

      {isVerified ? (
        <p className="text-green-500 text-center tracking-widest">
          Verification Successful!
        </p>
      ) : error && failedAttempts <= 2 ? (
        <p className="text-red-500 text-center tracking-widest">
          Invalid OTP. Please try again.
        </p>
      ) : null}

      {!isVerified && failedAttempts > 0 && failedAttempts < 3 && (
        <p
          className={`text-gray-600 tracking-widest ${
            failedAttempts === 2 ? "text-red-500" : ""
          }`}
        >
          Attempts left: {3 - failedAttempts}
        </p>
      )}

      <Button
        isDisabled={inputs.includes("") || failedAttempts >= 3}
        onClick={verifyCode}
        className="mt-2"
      >
        Verify Code
      </Button>

      <div className="text-center mt-2">
        <span
          className={`text-blue-500 underline cursor-pointer ml-1 ${
            coolDown > 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={sendCode}
        >
          {coolDown > 0 ? `Resend in ${coolDown}s` : "Send the code"}
        </span>
      </div>
    </Wrapper>
  );
};
