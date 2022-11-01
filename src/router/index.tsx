import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import MainMenu from '../pages/MainMenu';
import SandboxRouter from "./SandboxRouter";

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/map/" element={<></>} />
        {SandboxRouter()}
        <Route path="/" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}