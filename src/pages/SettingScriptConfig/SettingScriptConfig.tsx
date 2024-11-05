import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/Table/DynamicTable";
import Search from "../../components/Table/Search";
import {
  Button,
  Card,
  TitleContainer,
  Title,
} from "../../styles/styledTableLayout";
import { useList } from "../../customHooks/useList";
import { scriptAtom } from "../../recoil/atoms/setting";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { fetchScriptList } from "../../recoil/atoms/setting";
import { FetchListParams } from "../../utils/types";
import Pagination from "../../components/Table/Pagination";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { dynamicObject } from "../../utils/types";
import Error from "../Error";
import AddScriptConfig from "./AddScriptConfig";
import EditScriptConfig from "./EditScriptConfig";
import DeleteScriptConfig from "./DeleteScriptConfig";

// 스크립트 Config
const SettingScriptConfig: React.FC = () => {
  const setRecoilState = useSetRecoilState(scriptAtom);
  const recoilData = useRecoilValue(scriptAtom);
  const selectedRow = useRecoilValue(selectedRowAtom);

  const [headers, setHeaders] = useState<string[] | null>(null);
  const [keyName, setKeyname] = useState<string[] | null>(null);
  const [headerInfos, setHeaderInfos] = useState<dynamicObject[] | null>(null);
  const [data, setData] = useState<dynamicObject[] | null>(null);
  const [totCnt, setTotCnt] = useState<number | null>(null);
  const [error, setError] = useState<dynamicObject | null>(null);
  const itemsPerPage = 5;

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
    const result = await fetchScriptList({
      isHeaderInfo,
      rowCnt,
      startNum,
      sortKeyName,
      order,
      filter,
      filterArrAndOr,
      filterArr,
      configType: "SCRIPT",
    });

    if (result?.body) {
      setRecoilState(result);
    } else {
      console.log("axios error");
      setError(result?.error);
    }
  };

  const [params, setParams] = useState<FetchListParams>({
    isHeaderInfo: true,
    rowCnt: itemsPerPage,
    startNum: 0,
    sortKeyName: "updated_at", // 업데이트 시간
    order: "DESC",
    configType: "SCRIPT",
    filter: null,
  });

  const {
    sortOption,
    handleSort,
    currentPage,
    handlePageChange,
    handleRefresh,
    handleSearch,
  } = useList(itemsPerPage, params, setParams, fetchListData);

  useEffect(() => {
    fetchListData(params);
  }, []);

  useEffect(() => {
    if (recoilData && recoilData.body) {
      const headers = recoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.name); // Extract only the name

      const keyName = recoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.keyName); // Extract only the keyName

      const { headerInfos, configList, totalCnt } = recoilData?.body;

      setHeaders(headers);
      setKeyname(keyName);
      setHeaderInfos(headerInfos);
      setData(configList);
      setTotCnt(totalCnt);
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
          <Title>발급 설정 &gt; 스크립트 Config</Title>
        </TitleContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Search label="스크립트명" onSearch={handleSearch} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2px",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <AddScriptConfig handleRefresh={handleRefresh}>
              <Button>추가</Button>
            </AddScriptConfig>

            <EditScriptConfig handleRefresh={handleRefresh}>
              <Button disabled={selectedRow === null}>변경</Button>
            </EditScriptConfig>

            <DeleteScriptConfig handleRefresh={handleRefresh}>
              <Button disabled={selectedRow === null}>삭제</Button>
            </DeleteScriptConfig>
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
        {totCnt !== null && totCnt > 0 && (
          <div style={{ padding: "10px 10px" }}>
            <Pagination
              currentPage={currentPage}
              totCnt={totCnt}
              itemsPerPage={itemsPerPage}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </Card>
    </>
  );
};

export default SettingScriptConfig;
