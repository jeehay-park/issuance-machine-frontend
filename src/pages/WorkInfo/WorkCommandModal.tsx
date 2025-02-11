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
import Card from "../../components/Layout/Card";
import { FormContainer } from "../../styles/styledLogin";
import { FormRow, FormLabel, FormInput } from "../../styles/styledForm";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { tabStateAtom } from "../../recoil/atoms/selected";
import { workControl } from "../../recoil/atoms/work";
import { workCommand } from "../../utils/options";

// 작업 명령 : 작업 시작, 작업 종료, 작업 복구
const WorkCommandModal: React.FC<{
  children: ReactNode;
  handleRefresh?: () => void;
  command: string;
}> = ({ children, command, handleRefresh }) => {
  const [tabState, setTabState] = useRecoilState(tabStateAtom);
  const location = useLocation();
  const segments = location.pathname.split("/");
  const selectedTab = segments[2];

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
    // handleRefresh();
    setFormHeight(0); // Reset the height when closing the modal
    setSelectedRow(null);
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTab) {
      try {
        const result = await workControl({
          workId: tabState?.[selectedTab]?.work_id,
          command: command,
        });

        if (result) {
          setResponseMessage(result.header.rtnMessage);
          //   handleRefresh();
        } else {
          setResponseMessage("Failed to command work.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while commanding the work.");
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
                <h3 style={{ color: "white" }}>
                  작업 {workCommand?.[command]}
                </h3>
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
                  height: "220px",
                }}
              >
                <FormContainer>
                  <FormRow>
                    <FormLabel htmlFor="workId">작업명</FormLabel>
                    <FormInput
                      type="text"
                      id="hdlName"
                      name="workId"
                      //   onChange={handleChange}
                      placeholder={tabState?.[selectedTab]?.work_id}
                      disabled
                      // required
                    />
                  </FormRow>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "3rem 1rem 3rem 1rem",
                    }}
                  >
                    <img
                      src={warning}
                      width={"30px"}
                      style={{ marginRight: "10px" }}
                    />
                    <p style={{ fontWeight: "bold" }}>
                      해당 작업을 {workCommand?.[command]}하시겠습니까?
                    </p>
                  </div>
                </FormContainer>
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

export default WorkCommandModal;
