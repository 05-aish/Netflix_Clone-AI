import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "../pages/Homepage";
import { Route, Routes } from "react-router";
import Moviepage from "../pages/Moviepage";

const App = () => {
  return (
    <div className="text-sm">
      <Navbar/>
      <Routes>
        <Route path={"/"} element={<Homepage />}/>
        <Route path={"/movie/:id"} element={<Moviepage/>}/>
      </Routes>
    </div>
  );
};

export default App;