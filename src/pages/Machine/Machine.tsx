import React, { useState, useEffect } from "react";
import DynamicTable from "../../components/Table/DynamicTable";
import Search from "../../components/Table/Search";
import {
  Button,
  Card,
  TitleContainer,
  Title,
} from "../../styles/styledTableLayout";
import { useList } from "../../customHooks/useList";
import { useRecoilValue, useRecoilState } from "recoil";
import { FetchListParams } from "../../utils/types";
import Pagination from "../../components/Table/Pagination";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { dynamicObject } from "../../utils/types";
import Error from "../Error";
import { machineListAtom, fetchMachineList } from "../../recoil/atoms/machine";
import AddMachine from "./AddMachine";
import EditMachine from "./EditMachine";
import DeleteMachine from "./DeleteMachine";

// 발급 기계
const Machine: React.FC = () => {
  const [recoilData, setRecoilData] = useRecoilState(machineListAtom);
  const selectedRow = useRecoilValue(selectedRowAtom);
  const itemsPerPage = 5;
  const [headers, setHeaders] = useState<string[] | null>(null);
  const [keyName, setKeyname] = useState<string[] | null>(null);
  const [headerInfos, setHeaderInfos] = useState<dynamicObject[] | null>(null);
  const [data, setData] = useState<dynamicObject[] | null>(null);
  const [totCnt, setTotCnt] = useState<number | null>(null);
  const [error, setError] = useState<dynamicObject | null>(null);

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
    const result = await fetchMachineList({
      isHeaderInfo,
      rowCnt,
      startNum,
      sortKeyName,
      order,
      filter,
      filterArrAndOr,
      filterArr,
    });

    if (result?.body) {
      setRecoilData(result);
    } else {
      setError(result?.error);
    }
  };

  const [params, setParams] = useState<FetchListParams>({
    isHeaderInfo: true,
    rowCnt: itemsPerPage,
    startNum: 0,
    sortKeyName: "created_at",
    order: "DESC",
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
    if (recoilData) {
      const headers = recoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.name); // Extract only the name

      const keyName = recoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.keyName); // Extract only the keyName

      const { headerInfos, machineList, totalCnt } = recoilData?.body;

      setHeaders(headers);
      setKeyname(keyName);
      setHeaderInfos(headerInfos);
      setData(machineList);
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
          <Title>발급 기계 정보</Title>
        </TitleContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Search label="발급기 이름" onSearch={handleSearch} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2px",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <AddMachine handleRefresh={handleRefresh}>
              <Button>추가</Button>
            </AddMachine>
            <EditMachine handleRefresh={handleRefresh}>
              <Button disabled={selectedRow === null}>변경</Button>
            </EditMachine>
            <DeleteMachine handleRefresh={handleRefresh}>
              <Button disabled={selectedRow === null}>삭제</Button>
            </DeleteMachine>
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

        {totCnt && totCnt > 0 && (
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

export default Machine;
