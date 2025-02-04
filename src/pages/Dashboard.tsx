import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/atoms/auth";
// import { useAuth } from "../components/contexts/AuthContext";
import {
  DashboardContainer,
  Round,
  InfoItem,
  TabContainer,
  Tab,
} from "../styles/styledDashboard";
import DynamicTable from "../components/Table/DynamicTable";
import { dashboardResponse } from "../mockData/mockData";
import { dynamicObject } from "../utils/types";

const Dashboard: React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const [messages, setMessages] = useState<dynamicObject[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null); // Add state for WebSocket connection
  const [sortOption, setSortOption] = useState({
    key: "updated_at",
    order: "ASC",
  });
  // const { user, setUser } = useAuth();
  const headers = dashboardResponse.body.headerInfos.map((item) => item.name);
  const keyName = dashboardResponse.body.headerInfos.map(
    (item) => item.keyName
  );
  const data = dashboardResponse.body.items;
  const headerInfos = dashboardResponse.body.headerInfos;

  const handleShowId = (event: React.MouseEvent) => {
    event.preventDefault();
    if (auth) {
      // setUser(auth?.salt);
      console.log("auth...");
    }
  };

  const [selectedTab, setSelectedTab] = useState("3일"); // Default to "최근 3일"

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    // Add your data fetching logic here based on the `tab` value
    console.log("Fetching data for: ", tab);
  };


  return (
    <>
      <div>
        <DashboardContainer>
          <div
            style={{
              gridArea: "title",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "firstBaseline",
            }}
          >
            <h2
              style={{
                padding: "5px 5px",
                margin: "auto 1rem",
                // border: "1px solid purple",
              }}
            >
              ICTK 발급 작업 정보
            </h2>

            <div>
              <TabContainer>
                <Tab
                  active={selectedTab === "3일"}
                  onClick={() => handleTabClick("3일")}
                >
                  최근 3일 기준
                </Tab>
                <Tab
                  active={selectedTab === "2일"}
                  onClick={() => handleTabClick("2일")}
                >
                  최근 2일 기준
                </Tab>
                <Tab
                  active={selectedTab === "1일"}
                  onClick={() => handleTabClick("1일")}
                >
                  최근 1일 기준
                </Tab>
              </TabContainer>
            </div>
          </div>
          <div
            style={{
              borderRight: "1px solid #ddd",
              gridArea: "issuance",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 20px",
              gap: "2rem",
              // border: "1px solid purple"
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "1rem 2rem",
                border: "1px solid #0288D1",
                borderRadius: "15%",
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  color: "#0288D1",
                }}
              >
                발급 중 10%
              </p>
              <Round
                color="linear-gradient(135deg, #0288D1, #00B0FF)"
                size="120px"
              >
                123456
              </Round>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "1rem 2rem",
                border: "1px solid var(--red)",
                borderRadius: "15%",
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  color: "var(--red)",
                }}
              >
                발급 중지 5%
              </p>
              <Round
                color="linear-gradient(135deg, var(--red), #E64A19, #FF6F61)"
                size="120px"
              >
                1
              </Round>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "1rem 2rem",
                border: "1px solid #00796B",
                borderRadius: "15%",
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  color: "#00796B",
                }}
              >
                발급 완료 10%
              </p>
              <Round
                color="linear-gradient(135deg, #00796B, #4DB6AC)"
                size="120px"
              >
                45
              </Round>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "2rem 2rem",
                border: "1px solid #ddd",
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                발급 장비 서버 정보
              </p>
              <InfoItem>
                <span>Version:</span> <strong>2.15.3</strong>
              </InfoItem>
              <InfoItem>
                <span>DB Host:</span> <strong>192.168.100.92</strong>
              </InfoItem>
              <InfoItem>
                <span>DB Name:</span> <strong>manufacture_v2_0_test</strong>
              </InfoItem>
            </div>
          </div>

          <div
            style={{
              gridArea: "table",
              height: "90%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "98%" }}>
              <DynamicTable
                headers={headers}
                data={data}
                keyName={keyName}
                checkbox={false}
                height="300px"
                sortOption={sortOption}
                headerInfos={headerInfos}
              />
            </div>
          </div>
          <div style={{ display: "flex", padding: "2rem 2rem", gap: "2rem" }}>
            {messages?.map((item) => (
              <ul>
                <li>{item.name}</li>
                <li>{item.email}</li>
                <li>{item.age}</li>
              </ul>
            ))}
          </div>
        </DashboardContainer>
      </div>
    </>
  );
};

export default Dashboard;
