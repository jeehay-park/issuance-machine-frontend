import React, { useState } from "react";
import {
  TabMenu,
  TabItem,
  CloseIcon,
  Content,
  Table,
  SearchContainer,
  SearchRow,
  Label,
  Input,
  Select,
  ButtonContainer,
  Button,
} from "../styles/styledIssuance";
import DynamicTable from "../components/Table/DynamicTable";
import { mockResponse } from "../mockData/td";
import Search from "../components/Table/Search";

const Issuance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("작업화면"); // Default active tab
  const [tabs, setTabs] = useState<string[]>(["작업화면"]); // Start with one tab
  const [searchJobName, setSearchJobName] = useState<string>(""); // Search state for Job Name
  const [filterStatus, setFilterStatus] = useState<string>("전체"); // Filter state for 발급 상태
  const [searchProgram, setSearchProgram] = useState<string>(""); // Search state for Program

  const headers = mockResponse.body.headerInfos.map((item) => item.name);
  const keyName = mockResponse.body.headerInfos.map((item) => item.keyName);
  const data = mockResponse.body.items;

  const handleSearch = (searchText: string, selectedOption: string) => {
    console.log(`Searching for "${searchText}" in "${selectedOption}"`);
    // Implement your search logic here
  };

  // Example table data
  const tableData = [
    {
      name: "LGU+(LGU+) g5_usim usim test no lock 07/01_3",
      workno: "wki_631",
      programNo: "pj-120",
      orderNo: "202040701_6",
      program: "SIMUX_TEST_NO_LOCK_3(G5)",
      lockStatus: false,
      details: "3000/0/3000/3",
      fail: "100%",
      status: "0.00%(중지상태)",
      register: "24/07/30",
      due: "24/07/08",
      machineInfo: "USIM_3",
    },
    {
      name: "LGU+(LGU+) g5_usim usim test no lock 07/01_4",
      workno: "wki_632",
      programNo: "pj-120",
      orderNo: "202040701_6",
      program: "SIMUX_TEST_NO_LOCK_3(G5)",
      lockStatus: false,
      details: "3000/0/3000/3",
      fail: "100%",
      status: "0.00%(중지상태)",
      register: "24/07/30",
      due: "24/07/08",
      machineInfo: "USIM_3",
    },
  ];

  // Function to add a new tab from table item
  const handleAddTab = (tabName: string) => {
    if (!tabs.includes(tabName)) {
      setTabs((prevTabs) => [...prevTabs, tabName]); // Add new tab if not already added
    }
    setActiveTab(tabName); // Set the new tab as active
  };

  // Function to remove a tab
  const handleCloseTab = (tabName: string) => {
    const updatedTabs = tabs.filter((tab) => tab !== tabName);
    setTabs(updatedTabs);

    // If the active tab is closed, switch to the first tab in the list
    if (activeTab === tabName) {
      setActiveTab(updatedTabs[0]);
    }
  };

  // Function to render content based on the active tab
  const renderContent = () => {
    if (activeTab === "작업화면") {
      return (
        <>
          <SearchContainer>
            <SearchRow>
              <Label>발급 상태</Label>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="전체">전체</option>
                <option value="발급중">발급중</option>
                <option value="발급중지">발급중지</option>
                <option value="발급완료">발급완료</option>
              </Select>
            </SearchRow>
          </SearchContainer>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Search options={["작업명", "발급상태"]} onSearch={handleSearch} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "2px",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Button disabled>Button 1</Button>
              <Button>Button 2</Button>
            </div>
          </div>

          <DynamicTable
            headers={headers}
            data={data}
            keyName={keyName}
            checkbox={true}
            handleAddTab={handleAddTab}
          />
        </>
      );
    } else {
      const selectedJob = data.find((job) => job.workNo === activeTab);

      console.log(selectedJob, "selectedJob");
      return (
        <div>{selectedJob ? selectedJob.name : "No details available."}</div>
      );
    }
  };

  return (
    <div>
      <TabMenu>
        {tabs?.map((tab) => (
          <TabItem
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab !== "작업화면" && (
              <CloseIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(tab);
                }}
              >
                x
              </CloseIcon>
            )}
          </TabItem>
        ))}
      </TabMenu>

      <Content>
        {renderContent()} {/* Render content based on the selected tab */}
      </Content>
    </div>
  );
};

export default Issuance;
