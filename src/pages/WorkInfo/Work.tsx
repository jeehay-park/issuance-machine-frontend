import React, { useState, useEffect } from "react";
import {
  TabMenu,
  TabItem,
  CloseIcon,
  Content,
  SearchContainer,
  SearchRow,
  Label,
  Select,
  Button,
  Card,
} from "../../styles/styledIssuance";
import DynamicTable from "../../components/Table/DynamicTable";
import Search from "../../components/Table/Search";
import closeIcon from "../../components/assets/closeIcon.png";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import AddWorkModal from "../IssuanceWorkScreen/AddWorkModal";
import CopyWorkModal from "../IssuanceWorkScreen/CopyWorkModal";
import DeleteWorkModal from "../IssuanceWorkScreen/DeleteWorkModal";
import { workListAtom, fetchWorkList } from "../../recoil/atoms/work";
import { dynamicObject, FetchListParams } from "../../utils/types";
import { useList } from "../../customHooks/useList";
import Error from "../Error";
import WorkDetails from "./WorkDetails";
import Pagination from "../../components/Table/Pagination";
import { useNavigate } from "react-router-dom";

const Work: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("작업화면"); // Default active tab
  const [tabs, setTabs] = useState<string[]>(["작업화면"]); // Start with one tab
  const [filterStatus, setFilterStatus] = useState<string>("전체"); // Filter state for 발급 상태

  const setWorkList = useSetRecoilState(workListAtom);

  const workListRecoilData = useRecoilValue(workListAtom);
  const selectedRow = useRecoilValue(selectedRowAtom);

  const [headers, setHeaders] = useState<string[]>([]);
  const [keyName, setKeyname] = useState<string[] | null>(null);
  const [headerInfos, setHeaderInfos] = useState<dynamicObject[] | null>(null);
  const [data, setData] = useState<dynamicObject[] | null>(null);
  const [totCnt, setTotCnt] = useState<number | null>(null);
  const [error, setError] = useState<dynamicObject | null>(null);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const [params, setParams] = useState<FetchListParams>({
    isHeaderInfo: true,
    rowCnt: itemsPerPage,
    startNum: 0,
    sortKeyName: "updated_at", // 업데이트 시간
    order: "DESC",
  });

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
    const result = await fetchWorkList({
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
      setWorkList(result);
    } else {
      setError(result?.error);
    }
  };

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
    if (workListRecoilData) {
      const headers = workListRecoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.name); // Extract only the name

      const keyName = workListRecoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.keyName); // Extract only the keyName

      const { headerInfos, workList, totalCnt } = workListRecoilData?.body;

      setHeaders(headers);
      setKeyname(keyName);
      setHeaderInfos(headerInfos);
      setData(workList);
      setTotCnt(totalCnt);
    }
  }, [workListRecoilData]);

  const handleAddTab = (tabName: string) => {
    if (!tabs.includes(tabName)) {
      setTabs((prevTabs) => [...prevTabs, tabName]); // Add new tab if not already added
    }
    setActiveTab(tabName);
    navigate(tabName === "작업화면" ? `/work` : `/work/${tabName}`, {
      state : {selectedRow : selectedRow}
    });
   
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
              <DeleteWorkModal handleRefresh={handleRefresh}>
                <Button disabled={selectedRow === null}>삭제</Button>
              </DeleteWorkModal>

              <CopyWorkModal handleRefresh={handleRefresh}>
                <Button disabled={selectedRow === null}>복제</Button>
              </CopyWorkModal>

              <AddWorkModal handleRefresh={handleRefresh}>
                <Button>추가</Button>
              </AddWorkModal>
            </div>
          </div>

          <DynamicTable
            headers={headers}
            data={data}
            keyName={keyName}
            checkbox={true}
            handleAddTab={handleAddTab}
            headerInfos={headerInfos}
            sortOption={sortOption}
            handleSort={handleSort}
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
        </>
      );
    } else {
      return <WorkDetails />;
    }
  };

  if (workListRecoilData === null || error) {
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
    <div>
      <TabMenu>
        {tabs?.map((tab) => (
          <TabItem
            key={tab}
            active={activeTab === tab}
            onClick={() => {
              setActiveTab(tab);
              navigate(tab === "작업화면" ? `/work` : `/work/${tab}`, {
                state : {selectedRow : selectedRow}
              });
            }}
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

export default Work;
