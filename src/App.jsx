import { useContext } from "react";
import { OtpGenerator } from "./components/OtpGenerator";
import { SuccessModel } from "./components/SuccessModel";
import { AppContext } from "./context/AppContext";

function App() {
  const { step } = useContext(AppContext);

  return (
    <>
      {step === 1 && <OtpGenerator />}
      {step === 2 && <SuccessModel />}
    </>
  );
}

export default App;
