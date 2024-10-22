import React, { useState } from "react";
import DynamicTable from "../components/Table/DynamicTable";
import Search from "../components/Table/Search";
import {
  Button,
  Card,
  TitleContainer,
  Title,
} from "../styles/styledTableLayout";
import { useList } from "../customHooks/useList";
import { serialNumberResponse } from "../mockData/mockData";
import { codeInfoAtom } from "../recoil/atoms/code";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { fetchCodeInfo } from "../recoil/atoms/code";
import { FetchListParams } from "../utils/types";
import Pagination from "../components/Table/Pagination";
import { selectedRowAtom } from "../recoil/atoms/selected";

const SerialNumber: React.FC = () => {
  const setCodeInfoState = useSetRecoilState(codeInfoAtom);
  const recoilData = useRecoilValue(codeInfoAtom);
  const selectedRow = useRecoilValue(selectedRowAtom);

  const headers = serialNumberResponse.body.headerInfos.map(
    (item) => item.name
  );
  const keyName = serialNumberResponse.body.headerInfos.map(
    (item) => item.keyName
  );
  const headerInfos = serialNumberResponse.body.headerInfos;
  const data = serialNumberResponse.body.items;

  const fetchListData = async ({
    isHeaderInfo,
    rowCnt,
    startNum,
    sortKeyName,
    order,
    filter,
    filterArrAndOr,
    filterArr,
  }: FetchListParams) => {
    const result = await fetchCodeInfo({
      isHeaderInfo,
      rowCnt,
      startNum,
      sortKeyName,
      order,
      filter,
      filterArrAndOr,
      filterArr,
    });

    if (result) {
      setCodeInfoState(result);
    }
  };

  const [params, setParams] = useState<FetchListParams>({
    isHeaderInfo: true,
    rowCnt: 2,
    startNum: 0,
    sortKeyName: "updated_at",
    order: "DESC",
  });

  const itemsPerPage = 2;
  const {
    sortOption,
    handleSort,
    currentPage,
    handlePageChange,
    handleRefresh,
  } = useList(itemsPerPage, params, setParams, fetchListData);

  const handleSearch = (searchText: string, selectedOption: string) => {
    console.log(`Searching for "${searchText}" in "${selectedOption}"`);
  };

  return (
    <>
      <Card>
        <TitleContainer>
          <Title>시리얼 넘버 규칙</Title>
        </TitleContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Search label="SN 규칙명" onSearch={handleSearch} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2px",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Button>추가</Button>
            <Button disabled={selectedRow === null}>변경</Button>
            <Button disabled={selectedRow === null}>삭제</Button>
          </div>
        </div>

        <DynamicTable
          headers={headers}
          data={data}
          keyName={keyName}
          checkbox={true}
          headerInfos={headerInfos}
          sortOption={sortOption}
          handleSort={handleSort}
          height="400px"
        />

        <div style={{ padding: "10px 10px" }}>
          <Pagination
            currentPage={currentPage}
            totCnt={10}
            itemsPerPage={2}
            handlePageChange={handlePageChange}
          />
        </div>
      </Card>
    </>
  );
};

export default SerialNumber;
