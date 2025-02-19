import React, { ReactNode } from "react";
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
import { useRecoilState } from "recoil";
import success from "../../components/assets/green-tick.png";
import warning from "../../components/assets/warning.png";
import { MdClose, MdCheck } from "react-icons/md";
import Card from "../../components/Layout/Card";
import { errorAtom } from "../../recoil/atoms/error";

// 에러 모달
const ErrorModal: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [error, setError] = useRecoilState(errorAtom);

  const closeModal = () => {
    setError(null);
  };

  return (
    <>
      <div>{children}</div>
      <ModalBackground isVisible={error ? true : false}>
        <ModalContainer width="600px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>오류</h3>
              </ModalHeaderTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
          </ModalPadding>
          <ModalContent>
            <div
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
                <p style={{ fontWeight: "bold" }}>{error?.rtnMessage}</p>
              </Card>
            </div>
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
                  onClick={closeModal}
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

export default ErrorModal;
