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
import { Link, useLocation} from "react-router-dom";
import dashboard from "../assets/dashboard.gif";
import code from "../assets/code.gif";
import issuance from "../assets/issuance.gif";
import program from "../assets/program.gif";
import sn from "../assets/sn.gif";
import setting from "../assets/setting.gif";
import machine from "../assets/machine.gif";
import id from "../assets/id.gif";
import chevronRight from "../assets/chevronRight.gif";
import chevronLeft from "../assets/chevronLeft.gif";

type MenuItem = {
  name: string;
  path: string;
  icon: string;
  alt: string;
  subMenu?: { name: string; path: string; icon: string; alt: string }[];
};

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selected, setSelected] = useState<String | undefined>(undefined);

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const sidebarContents: MenuItem[] = [
    { name: "대시보드", path: "/dashboard", icon: dashboard, alt: "dashboard" },
    // { name: "작업 화면", path: "/issuance", icon: issuance, alt: "issuance" },
    { name: "작업 화면", path: "/work", icon: issuance, alt: "work" },
    {
      name: "프로그램 정보",
      path: "/program",
      icon: program,
      alt: "program",
    },
    { name: "시리얼 넘버 규칙", path: "/serialnumber", icon: sn, alt: "sn" },
    {
      name: "발급 설정 정보",
      path: "/setting",
      icon: setting,
      alt: "setting",
      subMenu: [
        {
          name: "프로파일 Config",
          path: "/profile",
          icon: dashboard,
          alt: "dashboard",
        },
        {
          name: "키발급코드 Config",
          path: "/keyissue",
          icon: dashboard,
          alt: "dashboard",
        },
        {
          name: "스크립트 Config",
          path: "/script",
          icon: dashboard,
          alt: "dashboard",
        },
      ],
    },
    {
      name: "발급 기계 정보",
      path: "/machine",
      icon: machine,
      alt: "machine",
    },
    { name: "코드 정보", path: "/codeinfo", icon: code, alt: "code" },
    { name: "사용자 정보", path: "/user", icon: code, alt: "user" },
  ];

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  const text = (
    <MenuBox>
      {sidebarContents?.map((item, index) =>
        item.path === "/setting" ? (
          <>
            <Link
              to={item.subMenu && item.subMenu[0].path || "/profile"}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center", // Centers items vertically
                  padding: "15px 15px",
                }}
                onClick={() => console.log("clicked!")}
              >
                <img
                  src={item.icon}
                  alt={item.alt}
                  width={"25px"}
                  style={{ borderRadius: "5px", marginLeft: "10px" }}
                />

                {isSidebarExpanded && (
                  <span style={{ marginLeft: "20px" }}>{item.name}</span>
                )}
              </div>
            </Link>

         
              {item.subMenu &&
                item.subMenu.map((subItem, subIndex) => (
                  <Link
                  to={subItem.path}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                  >
                  <div
                    key={subIndex}
                    style={{
                      display: "flex",
                      alignItems: "center", // Centers items vertically
                      padding: "10px 15px 10px 30px",
                    }}
                    onClick={() => console.log("clicked!")}
                  >
                    {isSidebarExpanded && (
                      <span style={{ marginLeft: "20px", color : location.pathname.startsWith(subItem.path) ? "#FFE599" : undefined }}>{subItem.name}</span>
                    )}
                  </div>
                  </Link>
                  
                ))}
         
          </>
        ) : (
          <Link
            to={item.path}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center", // Centers items vertically
                padding: "15px 15px",
              }}
              onClick={() => console.log("clicked!")}
            >
              <img
                src={item.icon}
                alt={item.alt}
                width={"25px"}
                style={{ borderRadius: "5px", marginLeft: "10px" }}
              />

              {isSidebarExpanded && (
                <span style={{ marginLeft: "20px", color : location.pathname.startsWith(item.path) ? "#FFE599" : undefined }}>{item.name}</span>
              )}
            </div>
          </Link>
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
            src={isSidebarExpanded ? chevronLeft : chevronRight}
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
