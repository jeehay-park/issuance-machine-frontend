import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import IssuanceWorkScreen from "./pages/IssuanceWorkScreen";
import CodeInfo from "./pages/CodeInfo";
import SerialNumber from "./pages/SerialNumber";
import Program from "./pages/Program";
import SettingProfileConfig from "./pages/SettingProfileConfig";
import SettingKeyIssueCodeConfig from "./pages/SettingKeyIssueCodeConfig";
import SettingScriptConfig from "./pages/SettingScriptConfig";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const sidebarContents = {
    login: { path: "/", description: "로그인" },
    dashboard: { path: "/dashboard", description: "대시보드" },
    issuance: { path: "/issuance", description: "작업 화면" },
    program: { path: "/program", description: "프로그램 정보" },
    serialnumber: { path: "/serialnumber", description: "시리얼 넘버 규칙" },
    setting: { path: "/setting", description: "발급 설정 정보" },
    profile: { path: "/profile", description: "프로파일 Config" },
    keyIssue: { path: "/keyissue", description: "키발급코드 Config" },
    script: { path: "/script", description: "스크립트 Config" },
    machine: { path: "/machine", description: "발급 기계 정보" },
    codeinfo: { path: "/codeinfo", description: "코드 정보" },
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path={sidebarContents.login.path} element={<Login />} />
          <Route element={<Layout />}>
            <Route
              path={sidebarContents.dashboard.path}
              element={<Dashboard />}
            />
            <Route
              path={sidebarContents.issuance.path}
              element={<IssuanceWorkScreen />}
            />
            <Route
              path={sidebarContents.codeinfo.path}
              element={<CodeInfo />}
            />
            <Route
              path={sidebarContents.serialnumber.path}
              element={<SerialNumber />}
            />
            <Route path={sidebarContents.program.path} element={<Program />} />
            <Route path={sidebarContents.profile.path} element={<SettingProfileConfig />} />
            <Route path={sidebarContents.keyIssue.path} element={<SettingKeyIssueCodeConfig />} />
            <Route path={sidebarContents.script.path} element={<SettingScriptConfig />} />
           
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
