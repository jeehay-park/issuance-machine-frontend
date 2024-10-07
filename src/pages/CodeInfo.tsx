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
import { useList } from "../customHooks/useList";
import { fetchCodeInfoList } from "../recoil/atoms/codeInfo";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { codeInfoAtom } from "../recoil/atoms/codeInfo";
import { FetchListParams } from "../utils/types";
import DeleteCodeInfoModal from "./CodeInfoModal/DeleteCodeInfoModal";

const CodeInfo: React.FC = () => {
  const setCodeInfoState = useSetRecoilState(codeInfoAtom);
  const recoilData = useRecoilValue(codeInfoAtom);

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
    const result = await fetchCodeInfoList({
      isHeaderInfo,
      rowCnt,
      startNum,
      sortIdx,
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
    sortIdx: 1,
    order: "DESC",
  });

  const itemsPerPage = 2;
  const { sortOption, handleSort, currentPage, handlePageChange, handleRefresh } = useList(
    itemsPerPage,
    params,
    setParams,
    fetchListData
  );

  const headers = codeInfoResponse.body.headerInfos.map((item) => item.name);
  const keyName = codeInfoResponse.body.headerInfos.map((item) => item.keyName);
  const headerInfos = codeInfoResponse.body.headerInfos;
  const data = codeInfoResponse.body.items;

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

  console.log("recoilData : ", recoilData);

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
            <DeleteCodeInfoModal handleRefresh={handleRefresh}>
            <Button>삭제</Button>
            </DeleteCodeInfoModal>
            
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

export default CodeInfo;
