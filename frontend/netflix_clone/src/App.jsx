import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "../pages/Homepage";
const App = () => {
  return (
    <div className="text-sm">
      <Navbar/>
      <Homepage/>
    </div>
  );
};

export default App;