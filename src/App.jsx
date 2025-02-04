import { useState } from "react";
import { OtpGenerator } from "./components/OtpGenerator";
import { SuccsessModel } from "./components/SuccsessModel";

function App() {
  const [showModel, setShowModel] = useState(false);

  return (
    <>
      {showModel ? (
        <SuccsessModel setShowModel={setShowModel} />
      ) : (
        <OtpGenerator setShowModel={setShowModel} />
      )}
    </>
  );
}

export default App;
