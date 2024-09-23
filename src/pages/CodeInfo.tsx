import React, { useState } from "react";
import { codeInfoResponse } from "../mockData/mockData";
import DynamicTable from "../components/Table/DynamicTable";
import Search from "../components/Table/Search";
import { Button, Card } from "../styles/styledTableLayout";

const CodeInfo: React.FC = () => {
  const [sortOption, setSortOption] = useState({ key: 2, order: "ASC" });

  const headers = codeInfoResponse.body.headerInfos.map((item) => item.name);
  const keyName = codeInfoResponse.body.headerInfos.map((item) => item.keyName);
  const headerInfos = codeInfoResponse.body.headerInfos;
  const data = codeInfoResponse.body.items;

  const handleSearch = (searchText: string, selectedOption: string) => {
    console.log(`Searching for "${searchText}" in "${selectedOption}"`);
    // Implement your search logic here
  };

  const handleSort = (headerKey: number) => {
    let newOrder;

    // Toggle sort order for the current column
    if (sortOption?.key === headerKey) {
      newOrder = sortOption.order === "ASC" ? "DESC" : "ASC";
    } else {
      newOrder = "ASC"; // Default to ASC when a new column is sorted
    }

    setSortOption({
      key: headerKey,
      order: newOrder,
    });
  };

  return (
    <>
      <Card>
        <h2 style={{ marginBottom: "2rem" }}>코드 정보</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Search label="코드명" onSearch={handleSearch} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2px",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Button disabled>추가</Button>
            <Button>삭제</Button>
          </div>
        </div>

        <DynamicTable
          headers={headers}
          data={data}
          keyName={keyName}
          checkbox={true}
          // handleAddTab={handleAddTab}
          headerInfos={headerInfos}
          sortOption={sortOption}
          handleSort={handleSort}
          height="400px"
        />

        <p>pagination</p>
      </Card>
    </>
  );
};

export default CodeInfo;
