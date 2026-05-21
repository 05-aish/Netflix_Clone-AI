import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "../pages/Homepage";
import { Route, Routes, useLocation } from "react-router";
import Moviepage from "../pages/Moviepage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import AiRecc from "../pages/AiRecc";


const App = () => {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const isFetching = useAuthStore((state) => state.isFetching);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  
  //retain user info after refresh
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="text-sm">
      {location.pathname !== '/signin' && location.pathname !== '/signup' && <Navbar />}

      <Toaster/>
      <Routes>
        <Route path={"/"} element={<Homepage />}/>
        <Route path={"/movie/:id"} element={<Moviepage/>}/>
        <Route path={"/signin"} element={<SignIn/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>
        <Route path={"/ai-recommendations"} element={<AiRecc/>}/>


      </Routes>
    </div>
  );
};

export default App;