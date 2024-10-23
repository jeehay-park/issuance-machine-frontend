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
import { profileAtom, profileInfoAtom } from "../../recoil/atoms/setting";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  fetchProfileList,
  fetchProfileInfoList,
} from "../../recoil/atoms/setting";
import { FetchListParams } from "../../utils/types";
import Pagination from "../../components/Table/Pagination";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { dynamicObject } from "../../utils/types";
import Error from "../Error";
import AddProfileConfig from "./AddProfileConfig";
import EditProfileConfig from "./EditProfileConfig";
import DeleteProfileConfig from "./DeleteProfileConfig";

const SettingProfileConfig: React.FC = () => {
  const setRecoilState = useSetRecoilState(profileAtom);
  const setProfileInfoState = useSetRecoilState(profileInfoAtom);
  const recoilData = useRecoilValue(profileAtom);
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
    const result = await fetchProfileList({
      isHeaderInfo,
      rowCnt,
      startNum,
      sortKeyName,
      order,
      filter,
      filterArrAndOr,
      filterArr,
      configType: "PROFILE",
    });

    if (result?.body) {
      setRecoilState(result);
    } else {
      setError(result);
    }
  };

  const fetchDetails = async () => {
    const result = await fetchProfileInfoList({
      configType: "profle",
      profId: "profId",
      keyisId: "keyisId",
      scrtId: "scrtId",
    });

    if (result?.body) {
      setProfileInfoState(result.body);
    }
  };

  const [params, setParams] = useState<FetchListParams>({
    isHeaderInfo: true,
    rowCnt: 5,
    startNum: 0,
    sortKeyName: "updated_at", // 업데이트 시간
    order: "DESC",
    configType: "PROFILE",
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
    if (recoilData) {
      const headers = recoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.name); // Extract only the name

      const keyName = recoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.keyName); // Extract only the keyName

      const { headerInfos, configList, totalCnt } = recoilData?.body;

      console.log("total Count : ", totalCnt);

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
          <Title>발급 설정 &gt; 프로파일 Config</Title>
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
            <AddProfileConfig handleRefresh={handleRefresh}>
              <Button>추가</Button>
            </AddProfileConfig>
            <EditProfileConfig handleRefresh={handleRefresh}>
              <Button disabled={selectedRow === null}>변경</Button>
            </EditProfileConfig>
            <DeleteProfileConfig handleRefresh={handleRefresh}>
              <Button disabled={selectedRow === null}>삭제</Button>
            </DeleteProfileConfig>
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

        <p onClick={fetchDetails}>파일보기</p>
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

export default SettingProfileConfig;
