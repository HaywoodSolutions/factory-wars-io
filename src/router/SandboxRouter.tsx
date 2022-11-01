import React from "react";
import {
  Route,
  Navigate
} from "react-router-dom";
import Sim from '../pages/Sim';

export default function SandboxRouter() {
  return (
    <>
      <Route path="/sim" element={<Navigate to="/sim/0,0" />} />
      <Route path="/sim/:cord" element={<Sim />} />
    </>
  );
}