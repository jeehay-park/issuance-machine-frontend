import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Container,
  Header,
  Sidebar,
  MainContent,
  ToggleButton,
  MenuBox,
  Dropdown,
  DropdownItem,
} from "../../styles/styledLayout";
import { Link } from "react-router-dom";
import dashboard from "./dashboard.gif";
import code from "./code.gif";
import issuance from "./issuance.gif";
import program from "./program.gif";
import sn from "./sn.gif";
import setting from "./setting.gif";
import machine from "./machine.gif";
import id from "./id.gif";
import chevronRight from "./chevronRight.gif";
import chevronLeft from "./chevronLeft.gif";

const Layout: React.FC = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const sidebarContents = [
    { name: "대시보드", path: "/dashboard", icon: dashboard, alt: "dashboard" },
    { name: "작업 화면", path: "/issuance", icon: issuance, alt: "issuance" },
    {
      name: "프로그램 정보",
      path: "/dashboard",
      icon: program,
      alt: "program",
    },
    { name: "시리얼 넘버 규칙", path: "/dashboard", icon: sn, alt: "sn" },
    {
      name: "발급 설정 정보",
      path: "/dashboard",
      icon: setting,
      alt: "setting",
    },
    {
      name: "발급 기계 정보",
      path: "/dashboard",
      icon: machine,
      alt: "machine",
    },
    { name: "코드 정보", path: "/dashboard", icon: code, alt: "code" },
  ];

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  const text = (
    <MenuBox>
      {sidebarContents?.map(
        (
          item: { name: string; path: string; icon: string; alt: string },
          index
        ) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center", // Centers items vertically
              padding: "20px 15px",
            }}
          >
            <img
              src={item.icon}
              alt={item.alt}
              width={"25px"}
              style={{ borderRadius: "5px", marginLeft: "10px" }}
            />

            {isSidebarExpanded && (
              <Link
                to={item.path}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "15px",
                  marginLeft: "20px",
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Link>
            )}
          </div>
        )
      )}
    </MenuBox>
  );

  return (
    <Container isExpanded={isSidebarExpanded}>
      <Sidebar isExpanded={isSidebarExpanded}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "1rem 1rem 0rem 1rem",
            // border : '1px solid orange'
          }}
        >
          <img
            src="ictk-logo.png"
            alt="id"
            width="80px"
            style={{ borderRadius: "10px", cursor: "pointer" }}
            onClick={goToDashboard}
          />
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "1rem 1rem 0rem 1rem",
          }}
        >
          <img
            src={isSidebarExpanded ? chevronRight : chevronLeft}
            alt={"chevron"}
            width={"25px"}
            style={{ borderRadius: "5px", marginLeft: "10px" }}
            onClick={toggleSidebar}
          />
        </div>

        {text}
      </Sidebar>
      <MainContent>
        <Header>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <img
              src={id}
              alt="id"
              width="35px"
              style={{ borderRadius: "10px", cursor: "pointer" }}
              onClick={toggleDropdown}
            />
          </div>
          <Dropdown isVisible={isDropdownVisible}>
            <DropdownItem>계정 정보</DropdownItem>
            <DropdownItem>로그 아웃</DropdownItem>
          </Dropdown>
        </Header>
        
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default Layout;
