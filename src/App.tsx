import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import Issuance from "./pages/Issuance";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/issuance" element={<Issuance />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
