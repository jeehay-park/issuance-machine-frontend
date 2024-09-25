import React, { useState, ReactNode, MouseEvent } from "react";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalHeaderTitle,
  ModalPadding,
  ModalContent,
} from "../../styles/styledModal";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { useRecoilValue } from "recoil";
import { deleteCodeInfo } from "../../recoil/atoms/codeInfo";
import confetti from "canvas-confetti";
import success from "../../components/assets/green-tick.png";

// 코드 정보 삭제
const DeleteCodeInfoModal: React.FC<{
  children: ReactNode;
  handleRefresh?: () => void;
}> = ({ children, handleRefresh }) => {
  const selectedRow = useRecoilValue(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const openModal = () => {
    setResponseMessage(null);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    setModalOpen(false);
  };

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();

    deleteCodeInfo({ deleteCodeInfo: "delete" })
      .then((result) => {
        if (result) {
          console.log("result arrived!");
          setResponseMessage(result.header.rtnMessage);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });

          if(handleRefresh) {
            handleRefresh();
          }
         
        }
      })
      .catch((error) => {
        console.error("Error deleting code info:", error);
      });
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="500px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--red)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>코드 삭제</h3>
              </ModalHeaderTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
          </ModalPadding>
          <ModalContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 20px",
              }}
            >
              {responseMessage ? (
                <div
                  style={{
                    padding: "20px 20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={success} width={"40px"} />

                  <p style={{ padding: "5px 5px", fontWeight: "bold" }}>
                    {responseMessage}
                  </p>
                </div>
              ) : (
                <form>
                  <label>코드명 : </label>
                  <p style={{ padding: "5px 5px", fontWeight: "bold" }}>
                    {selectedRow?.codename}
                  </p>

                  <br />

                  <p>해당 코드를 삭제하시겠습니까?</p>
                  <p>코드 삭제 시 프로그램의 동작에 영향을 줄 수 있습니다.</p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "2rem",
                      marginTop: "2rem",
                    }}
                  >
                    <button onClick={handleCancel}>취소</button>
                    <button onClick={handleSubmit}>확인</button>
                  </div>
                </form>
              )}
            </div>
          </ModalContent>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

export default DeleteCodeInfoModal;
