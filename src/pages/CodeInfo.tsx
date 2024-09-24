import React, { useState, useEffect } from "react";
import { codeInfoResponse } from "../mockData/mockData";
import DynamicTable from "../components/Table/DynamicTable";
import Search from "../components/Table/Search";
import {
  Button,
  Card,
  TitleContainer,
  Title,
  Subtitle,
} from "../styles/styledTableLayout";
import Pagination from "../components/Table/Pagination";
import { useSort } from "../utils/useSort";
import { codeInfoList } from "../recoil/atoms/codeInfo";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { CodeInfoAtom } from "../recoil/atoms/codeInfo";
import { FetchListParams } from "../utils/types";

const CodeInfo: React.FC = () => {
  const setCodeInfoState = useSetRecoilState(CodeInfoAtom);
  const fetchListData = async ({
    isHeaderInfo,
    rowCnt,
    startNum,
    sortIdx,
    order,
    filter,
    filterArrAndOr,
    filterArr,
  }: FetchListParams) => {
    const result = await codeInfoList({
      isHeaderInfo,
      rowCnt,
      startNum,
      sortIdx,
      order,
      filter,
      filterArrAndOr,
      filterArr,
    });

    console.log(result);

    if (result) {
      setCodeInfoState(result.body);
    }
  };

  const [params, setParams] = useState<FetchListParams>({
    isHeaderInfo: true,
    rowCnt: 2,
    startNum: 0,
    sortIdx: 1,
    order: "DESC",
  });

  const itemsPerPage = 2;
  const { sortOption, handleSort, currentPage, handlePageChange } = useSort(
    itemsPerPage,
    params,
    setParams,
    fetchListData
  );

  const headers = codeInfoResponse.body.headerInfos.map((item) => item.name);
  const keyName = codeInfoResponse.body.headerInfos.map((item) => item.keyName);
  const headerInfos = codeInfoResponse.body.headerInfos;
  const data = codeInfoResponse.body.items;

  const recoilData = useRecoilValue(CodeInfoAtom);

  const handleSearch = (searchText: string, selectedOption: string) => {
    console.log(`Searching for "${searchText}" in "${selectedOption}"`);
  };

  useEffect(() => {
    fetchListData({
      isHeaderInfo: true,
      rowCnt: 5,
      startNum: 0,
      sortIdx: 1,
      order: "DESC",
    });
  }, []);

  console.log(recoilData);

  return (
    <>
      <Card>
        <TitleContainer>
          <Title>코드 정보</Title>
        </TitleContainer>
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
          headerInfos={headerInfos}
          sortOption={sortOption}
          handleSort={handleSort}
          height="400px"
        />

        <div style={{ padding: "20px 10px" }}>
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

export default CodeInfo;
