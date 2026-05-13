import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "../pages/Homepage";
import { Route, Routes, useLocation } from "react-router";
import Moviepage from "../pages/Moviepage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const App = () => {
  const location = useLocation();
  return (
    <div className="text-sm">
      {location.pathname !== '/signin' && location.pathname !== '/signup' && <Navbar />}
      <Routes>
        <Route path={"/"} element={<Homepage />}/>
        <Route path={"/movie/:id"} element={<Moviepage/>}/>
        <Route path={"/signin"} element={<SignIn/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>

      </Routes>
    </div>
  );
};

export default App;