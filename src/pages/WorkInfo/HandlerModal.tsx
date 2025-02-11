import React, { useState, ReactNode, useEffect, useRef } from "react";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalHeaderTitle,
  ModalFooter,
  ModalFooterContent,
  ModalPadding,
  ModalContent,
} from "../../styles/styledModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import success from "../../components/assets/green-tick.png";
import warning from "../../components/assets/warning.png";
import { MdClose, MdCheck } from "react-icons/md";
import { Card, Button } from "../../styles/styledTableLayout";
import { dynamicObject } from "../../utils/types";
import {
  fetchWorkHandlerList,
  workHandlerListAtom,
} from "../../recoil/atoms/work";
import DynamicTable from "../../components/Table/DynamicTable";
import AddHandler from "./AddHandler";
import DeleteHandler from "./DeleteHandler";
import { tabStateAtom } from "../../recoil/atoms/selected";
import Pagination from "../../components/Table/Pagination";
import { useList } from "../../customHooks/useList";
import { FetchListParams } from "../../utils/types";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

// 핸들러 모달
const HandlerModal: React.FC<{
  children: ReactNode;
  handleRefresh?: () => void;
}> = ({ children }) => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const segments = location.pathname.split("/"); // ["", "work", "work_04"]
  const selectedTab = segments[2];
  const [tabState, setTabState] = useRecoilState(tabStateAtom);

  const setworkHandlerList = useSetRecoilState(workHandlerListAtom);
  const workHandlerListRecoilData = useRecoilValue(workHandlerListAtom);

  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const itemsPerPage = 5;
  const [headers, setHeaders] = useState<string[]>([]);
  const [keyName, setKeyname] = useState<string[] | null>(null);
  const [headerInfos, setHeaderInfos] = useState<dynamicObject[] | null>(null);
  const [data, setData] = useState<dynamicObject[] | null>(null);
  const [totCnt, setTotCnt] = useState<number | null>(null);
  const [error, setError] = useState<dynamicObject | null>(null);

  useEffect(() => {
    if (formContainerRef.current) {
      setFormHeight(formContainerRef.current.offsetHeight);
      setFormWidth(formContainerRef.current.offsetWidth);
    }
  }, [formContainerRef, isModalOpen]);

  const openModal = () => {
    setResponseMessage(null);
    setModalOpen(true);
    setFormHeight(0); // Reset height when opening modal
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormHeight(0); // Reset the height when closing the modal
    // setSelectedRow(null);
  };

  const fetchListData = async ({
    workId,
    rowCnt,
    startNum,
    sortKeyName,
    order,
    isHeaderInfo,
  }: FetchListParams) => {
    const result = await fetchWorkHandlerList({
      workId: tabState?.[selectedTab]?.work_id,
      rowCnt,
      startNum,
      sortKeyName,
      order,
      isHeaderInfo,
    });

    if (result?.body) {
      setworkHandlerList(result);
    } else {
      setError(result?.error);
    }
  };

  const [params, setParams] = useState<FetchListParams>({
    workId: tabState?.[selectedTab]?.work_id,
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
    if (isModalOpen) {
      fetchListData(params);
    }
  }, [isModalOpen ? isModalOpen : undefined]);

  useEffect(() => {
    if (workHandlerListRecoilData) {
      const headers = workHandlerListRecoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.name); // Extract only the name

      const keyName = workHandlerListRecoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.keyName); // Extract only the keyName

      const { headerInfos, workHandlers, totalCnt } =
        workHandlerListRecoilData?.body;

      setHeaders(headers);
      setKeyname(keyName);
      setHeaderInfos(headerInfos);
      setData(workHandlers);
      setTotCnt(totalCnt);
    }
  }, [workHandlerListRecoilData]);

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="700px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>핸들러 목록</h3>
              </ModalHeaderTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
          </ModalPadding>
          <ModalContent>
            {responseMessage ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: `${formWidth}px`,
                  height: `${formHeight}px`,
                }}
              >
                <Card>
                  <img src={success} width={"40px"} />
                  <p style={{ padding: "5px 5px", fontWeight: "bold" }}>
                    {responseMessage}
                  </p>
                </Card>
              </div>
            ) : (
              <div
                ref={formContainerRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  height: "400px",
                }}
              >
                <Card>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: " 100%",
                      fontWeight: " bold",
                      color: "#333",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "1rem",
                        fontWeight: " bold",
                        color: "#333",
                      }}
                    >
                      작업명
                    </div>
                    <div>{tabState?.[selectedTab]?.tag_name}</div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: " bold",
                      color: "#333",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: "0.5",
                        justifyContent: "flex-start",
                      }}
                    >
                      핸들러
                    </div>
                    <div
                      style={{
                        display: "flex",
                        // flex: "0.5",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <DeleteHandler handleRefresh={handleRefresh}>
                        <Button>삭제</Button>
                      </DeleteHandler>

                      <AddHandler handleRefresh={handleRefresh}>
                        <Button>추가</Button>
                      </AddHandler>
                    </div>
                  </div>

                  <DynamicTable
                    headers={headers}
                    data={data}
                    keyName={keyName}
                    checkbox={true}
                    headerInfos={headerInfos}
                    //   sortOption={sortOption}
                    //   handleSort={handleSort}
                    //   height="400px"
                    height="300px"
                  />
                  {totCnt !== null && totCnt > 0 && (
                    <div>
                      <Pagination
                        currentPage={currentPage}
                        totCnt={totCnt}
                        itemsPerPage={itemsPerPage}
                        handlePageChange={handlePageChange}
                      />
                    </div>
                  )}
                </Card>
              </div>
            )}
          </ModalContent>
          <ModalPadding>
            <ModalFooter>
              <ModalFooterContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                  onClick={closeModal}
                >
                  <MdClose
                    size={20}
                    color="red"
                    style={{ fontWeight: "bolder" }}
                  />
                  <h4>취소</h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                  onClick={responseMessage ? closeModal : closeModal}
                >
                  <MdCheck
                    size={20}
                    color="green"
                    style={{ fontWeight: "bolder" }}
                  />
                  <h4>확인</h4>
                </div>
              </ModalFooterContent>
            </ModalFooter>
          </ModalPadding>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

export default HandlerModal;
