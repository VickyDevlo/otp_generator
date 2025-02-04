import { useState } from "react";
import { OtpGenerator } from "./components/OtpGenerator";
import { SuccessModel } from "./components/SuccessModel";

function App() {
  const [showModel, setShowModel] = useState(false);

  return (
    <>
      {showModel ? (
        <SuccessModel setShowModel={setShowModel} />
      ) : (
        <OtpGenerator setShowModel={setShowModel} />
      )}
    </>
  );
}

export default App;
