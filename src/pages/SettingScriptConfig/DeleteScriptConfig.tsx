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
import { deleteScript } from "../../recoil/atoms/setting";
import Card from "../../components/Layout/Card";

// 스크립트 설정 삭제
const DeleteScriptConfig: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const selectedRow = useRecoilValue(selectedRowAtom);
  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

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
    handleRefresh();
    setFormHeight(0); // Reset the height when closing the modal
    setSelectedRow(null);
  };

  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    setModalOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedRow) {
      try {
        const result = await deleteScript({
          configType: "SCRIPT",
          scrtId: selectedRow.scrt_id,
        });

        console.log(result);

        if (result) {
          setResponseMessage(result.header.rtnMessage);
          handleRefresh(); // Refresh data after creation
        } else {
          setResponseMessage("Failed to create profile.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while deleting the script.");
      }
    }
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="600px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>스크립트 삭제</h3>
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
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "200px",
                }}
              >
                <Card>
                  <img
                    src={warning}
                    width={"30px"}
                    style={{ marginRight: "10px" }}
                  />
                  <p style={{ fontWeight: "bold" }}>
                    스크립트 정보를 삭제하시겠습니까?
                  </p>
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

export default DeleteScriptConfig;
