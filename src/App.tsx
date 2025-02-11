import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CodeInfo from "./pages/CodeInfo/CodeInfo";
import SerialNumber from "./pages/SerialNumber/SerialNumber";
import Program from "./pages/Program/Program";
import SettingProfileConfig from "./pages/SettingProfileConfig/SettingProfileConfig";
import SettingKeyIssueCodeConfig from "./pages/SettingKeyIssueCodeConfig/SettingKeyIssueCodeConfig";
import SettingScriptConfig from "./pages/SettingScriptConfig/SettingScriptConfig";
import NotFound from "./pages/NotFound";
import SerialNumberDetails from "./pages/SerialNumber/SerialNumberDetails";
import ProfileConfigDetails from "./pages/SettingProfileConfig/ProfileConfigDetails";
import KeyIssueConfigDetails from "./pages/SettingKeyIssueCodeConfig/KeyIssueConfigDetails";
import Machine from "./pages/Machine/Machine";
import MachineDetails from "./pages/Machine/MachineDetails";
import ScriptConfigDetails from "./pages/SettingScriptConfig/ScriptConfigDetails";
import CodeEnum from "./pages/CodeEnum/CodeEnum";
import ProgramDetails from "./pages/Program/ProgramDetails";
import Work from "./pages/WorkInfo/Work";

const App: React.FC = () => {
  const sidebarContents = {
    login: { path: "/", description: "로그인" },
    dashboard: { path: "/dashboard", description: "대시보드" },
    work: { path: "/work/*", description: "작업 화면" },
    program: { path: "/program", description: "프로그램 정보" },
    ProgramDetails: {
      path: "/program/details",
      description: "프로그램 상세 정보",
    },
    serialnumber: { path: "/serialnumber", description: "시리얼 넘버 규칙" },
    serialnumberDetails: {
      path: "/serialnumber/details",
      description: "시리얼 넘버 규칙 상세정보",
    },
    setting: { path: "/setting", description: "발급 설정 정보" },
    profile: { path: "/profile", description: "프로파일 Config" },
    profileDetails: {
      path: "/profile/details",
      description: "프로파일 Config 상세정보",
    },
    keyIssue: { path: "/keyissue", description: "키발급코드 Config" },
    keyIssueDetails: {
      path: "/keyissue/details",
      description: "키발급코드 Config 상세정보",
    },
    script: { path: "/script", description: "스크립트 Config" },
    scriptDetails: {
      path: "/script/details",
      description: "스크립트 Config 상세정보",
    },
    machine: { path: "/machine", description: "발급 기계 정보" },
    machineDetails: {
      path: "/machine/details",
      description: "발급 기계 상세 정보",
    },
    codeinfo: { path: "/codeinfo", description: "코드 정보" },
    codeenum: { path: "/codeinfo/codeenum", description: "코드 ENUM 정보" },
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
            <Route path={sidebarContents.work.path} element={<Work />} />

            <Route
              path={sidebarContents.codeinfo.path}
              element={<CodeInfo />}
            />
            <Route
              path={sidebarContents.serialnumber.path}
              element={<SerialNumber />}
            />
            <Route
              path={sidebarContents.serialnumberDetails.path}
              element={<SerialNumberDetails />}
            />
            <Route path={sidebarContents.program.path} element={<Program />} />
            <Route
              path={sidebarContents.ProgramDetails.path}
              element={<ProgramDetails />}
            />
            <Route
              path={sidebarContents.profile.path}
              element={<SettingProfileConfig />}
            />
            <Route
              path={sidebarContents.profileDetails.path}
              element={<ProfileConfigDetails />}
            />
            <Route
              path={sidebarContents.keyIssue.path}
              element={<SettingKeyIssueCodeConfig />}
            />
            <Route
              path={sidebarContents.keyIssueDetails.path}
              element={<KeyIssueConfigDetails />}
            />
            <Route
              path={sidebarContents.script.path}
              element={<SettingScriptConfig />}
            />
            <Route
              path={sidebarContents.scriptDetails.path}
              element={<ScriptConfigDetails />}
            />
            <Route path={sidebarContents.machine.path} element={<Machine />} />
            <Route
              path={sidebarContents.machineDetails.path}
              element={<MachineDetails />}
            />
            <Route
              path={sidebarContents.codeenum.path}
              element={<CodeEnum />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
