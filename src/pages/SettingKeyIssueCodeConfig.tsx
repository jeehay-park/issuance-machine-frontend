import React, { useEffect, useState } from "react";
import DynamicTable from "../components/Table/DynamicTable";
import Search from "../components/Table/Search";
import {
  Button,
  Card,
  TitleContainer,
  Title,
} from "../styles/styledTableLayout";
import { useList } from "../utils/useList";

import { profileAtom } from "../recoil/atoms/setting";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { fetchProfileList } from "../recoil/atoms/setting";
import { FetchListParams } from "../utils/types";
import Pagination from "../components/Table/Pagination";
import { selectedRowAtom } from "../recoil/atoms/selected";
import { dynamicObject } from "../utils/types";
import Error from "./Error";

const SettingKeyIssueCodeConfig: React.FC = () => {
  const setProfileState = useSetRecoilState(profileAtom);
  const recoilData = useRecoilValue(profileAtom);
  const selectedRow = useRecoilValue(selectedRowAtom);

  const [headers, setHeaders] = useState<string[] | null>(null);
  const [keyName, setKeyname] = useState<string[] | null>(null);
  const [headerInfos, setHeaderInfos] = useState<dynamicObject[] | null>(null);
  const [data, setData] = useState<dynamicObject[] | null>(null);

  const [error, setError] = useState<dynamicObject | null>(null);

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
    const result = await fetchProfileList({
      isHeaderInfo,
      rowCnt,
      startNum,
      sortIdx,
      order,
      filter,
      filterArrAndOr,
      filterArr,
      configType: "KEYISSUE",
    });

    if (result?.body) {
      console.log("result : ", result);
      setProfileState(result);
    } else {
      setError(result);
    }
  };

  const [params, setParams] = useState<FetchListParams>({
    isHeaderInfo: true,
    rowCnt: 2,
    startNum: 0,
    sortIdx: 1,
    order: "DESC",
    configType: "KEYISSUE",
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

  useEffect(() => {
    fetchListData(params);
  }, []);

  useEffect(() => {
    if (recoilData) {
      const headers = recoilData?.body?.headerInfos.map(
        (item: { [key: string]: any }) => item.name
      );
      const keyName = recoilData?.body?.headerInfos.map(
        (item: { [key: string]: any }) => item.keyName
      );
      const headerInfos = recoilData?.body?.headerInfos;
      const data = recoilData?.body?.items;

      setHeaders(headers);
      setKeyname(keyName);
      setHeaderInfos(headerInfos);
      setData(data);
    }
  }, [recoilData]);

  if (recoilData === null || error) {
    return (
      <>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //   border: "1px solid red",
            }}
          >
            <Error error={error} />
          </div>
        </Card>
      </>
    );
  }
  return (
    <>
      <Card>
        <TitleContainer>
          <Title>발급 설정 키발급코드 Config</Title>
        </TitleContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Search label="프로파일명" onSearch={handleSearch} />
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

export default SettingKeyIssueCodeConfig;
