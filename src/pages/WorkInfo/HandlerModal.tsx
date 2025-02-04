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
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { useRecoilValue, useSetRecoilState } from "recoil";
import success from "../../components/assets/green-tick.png";
import warning from "../../components/assets/warning.png";
import { MdClose, MdCheck } from "react-icons/md";
import { Card, Button } from "../../styles/styledTableLayout";
import { deleteProgram } from "../../recoil/atoms/program";
import { dynamicObject } from "../../utils/types";
import {
  fetchWorkHandlerList,
  workHandlerListAtom,
} from "../../recoil/atoms/work";
import DynamicTable from "../../components/Table/DynamicTable";
import AddHandler from "./AddHandler";

// 핸들러 모달
const HandlerModal: React.FC<{
  children: ReactNode;
  handleRefresh?: () => void;
}> = ({ children }) => {
  const selectedRow = useRecoilValue(selectedRowAtom);
  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const setRecoilState = useSetRecoilState(workHandlerListAtom);
  const recoilData = useRecoilValue(workHandlerListAtom);
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
    // handleRefresh();
    setFormHeight(0); // Reset the height when closing the modal
    setSelectedRow(null);
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedRow) {
      try {
        const result = await deleteProgram({
          progId: selectedRow.prog_id,
        });

        if (result) {
          setResponseMessage(result.header.rtnMessage);
          //   handleRefresh();
        } else {
          setResponseMessage("Failed to delete the program.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while deleting the program.");
      }
    }
  };

  type FetchListDataParams = {
    workId: string;
  };

  const fetchListData = async ({ workId }: FetchListDataParams) => {
    const result = await fetchWorkHandlerList({
      workId: selectedRow?.work_id,
    });

    if (result?.body) {
      setRecoilState(result);
    } else {
      setError(result?.error);
    }
  };

  const [params, setParams] = useState<FetchListDataParams>({
    workId: selectedRow?.work_id,
  });

  useEffect(() => {
    const fetchListData = async ({ workId }: FetchListDataParams) => {
      const result = await fetchWorkHandlerList({
        workId: selectedRow?.work_id,
      });

      if (result?.body) {
        setRecoilState(result);
      } else {
        setError(result?.error);
      }
    };

    fetchListData({ workId: selectedRow?.work_id });
  }, []);

  useEffect(() => {
    console.log(recoilData);
    if (recoilData) {
      const headers = recoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.name); // Extract only the name

      const keyName = recoilData?.body?.headerInfos
        .filter((item: { [key: string]: any }) => item.display) // Only items with display as true
        .map((item: { [key: string]: any }) => item.keyName); // Extract only the keyName

      const { headerInfos, workHandlers, totalCnt } = recoilData?.body;

      setHeaders(headers);
      setKeyname(keyName);
      setHeaderInfos(headerInfos);
      setData(workHandlers);
      setTotCnt(totalCnt);
    }
  }, [recoilData]);

  const handleRefresh = async () => {
    await fetchWorkHandlerList({
      workId: selectedRow?.work_id,
    });
  };

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
                    <div>{selectedRow?.tag_name}</div>
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
                      <Button>삭제</Button>
                      <AddHandler handleRefresh={handleRefresh}>
                        <Button>추가</Button>
                      </AddHandler>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <DynamicTable
                      headers={headers}
                      data={data}
                      keyName={keyName}
                      checkbox={true}
                      headerInfos={headerInfos}
                      //   sortOption={sortOption}
                      //   handleSort={handleSort}
                      //   height="400px"
                      height="200px"
                    />
                  </div>
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
                  onClick={responseMessage ? closeModal : handleSubmit}
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
