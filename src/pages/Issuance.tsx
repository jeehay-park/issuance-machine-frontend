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
import { workResponse } from "../mockData/mockData";
import Search from "../components/Table/Search";
import closeIcon from "../components/assets/closeIcon.png";

const Issuance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("작업화면"); // Default active tab
  const [tabs, setTabs] = useState<string[]>(["작업화면"]); // Start with one tab
  const [searchJobName, setSearchJobName] = useState<string>(""); // Search state for Job Name
  const [filterStatus, setFilterStatus] = useState<string>("전체"); // Filter state for 발급 상태
  const [searchProgram, setSearchProgram] = useState<string>(""); // Search state for Program

  const headers = workResponse.body.headerInfos.map((item) => item.name);
  const keyName = workResponse.body.headerInfos.map((item) => item.keyName);
  const data = workResponse.body.items;

  const handleSearch = (searchText: string, selectedOption: string) => {
    console.log(`Searching for "${searchText}" in "${selectedOption}"`);
    // Implement your search logic here
  };

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
                <img src={closeIcon} alt="close" width={"20px"} />
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
