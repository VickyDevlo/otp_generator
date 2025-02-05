import { useState } from "react";
import { OtpGenerator } from "./components/OtpGenerator";
import { UserForm } from "./components/UserForm";
import { SuccessModel } from "./components/SuccessModel";

function App() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [generatedOtp, setGeneratedOtp] = useState(null);

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    return newOtp;
  };

  return (
    <>
      {step === 1 && (
        <UserForm
          setUserData={setUserData}
          setStep={setStep}
          generateOtp={generateOtp}
          setGeneratedOtp={setGeneratedOtp}
        />
      )}
      {step === 2 && (
        <OtpGenerator
          userData={userData}
          setStep={setStep}
          generateOtp={generateOtp}
          setGeneratedOtp={setGeneratedOtp}
          generatedOtp={generatedOtp}
        />
      )}
      {step === 3 && <SuccessModel userData={userData} setStep={setStep}/>}
    </>
  );
}

export default App;
