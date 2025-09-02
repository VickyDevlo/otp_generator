import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [generatedOtp, setGeneratedOtp] = useState(null);

  const generateOtp = () => {
    const newOtp = Math.floor(10000 + Math.random() * 90000).toString();
    setGeneratedOtp(newOtp);
    return newOtp;
  };

  return (
    <AppContext.Provider value={{ step, setStep, generatedOtp, generateOtp, setGeneratedOtp }}>
      {children}
    </AppContext.Provider>
  );
};
