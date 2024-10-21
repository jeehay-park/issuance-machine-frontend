import React, {
  useState,
  ReactNode,
  FormEvent,
  ChangeEvent,
  useEffect,
  useRef,
} from "react";
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
import {
  FormContainer,
  FormRow,
  FormLabel,
  FormInput,
  RadioInput,
  RadioLabel,
  FormSelect,
  FormButton,
  FormError,
} from "../../styles/styledForm";
import { dynamicObject } from "../../utils/types";
import { MdClose, MdCheck } from "react-icons/md";
import { deleteProfile } from "../../recoil/atoms/setting";

// Define the shape of form data and error messages
interface FormData {
  // name: string | null;
  // workNo: string | null;
  // programNo: string | null;
  configType: "PROFILE";
  profileConfig: {
    profId?: string | null;
    profName: string | null;
    description: string | null;
    profType?: string | null;
    version: string | null;
    // ctntData: string | null;
    dataHash: string | null;
  };
}

interface FormErrors {
  profileConfig: {
    profId?: string | null;
    profName: string | null;
    description: string | null;
    profType?: string | null;
    version: string | null;
    // ctntData: string | null;
    dataHash: string | null;
  };
}

// Profile 설정 삭제
const DeleteProfileConfig: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const setSelectedRowState = useSetRecoilState(selectedRowAtom);
  const selectedRow = useRecoilValue(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formContainerRef.current) {
      setFormHeight(formContainerRef.current.offsetHeight);
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
  };

  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    setModalOpen(false);
  };

  const [formData, setFormData] = useState<FormData>({
    configType: "PROFILE",
    profileConfig: {
      profId: null,
      profName: null,
      description: null,
      profType: null,
      version: null,
      //   ctntData: null,
      dataHash: null,
    },
  });

  const [errors, setErrors] = useState<FormErrors>({
    profileConfig: {
      profId: null,
      profName: null,
      description: null,
      profType: null,
      version: null,
      //   ctntData: null,
      dataHash: null,
    },
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedRow) {
      try {
        const result = await deleteProfile({
          configType: "PROFILE",
          profId: selectedRow.prof_id,
        });

        console.log(result);

        if (result) {
          setResponseMessage(result.header.rtnMessage);
          handleRefresh(); // Refresh data after creation
          setSelectedRowState(null);
        } else {
          setResponseMessage("Failed to create profile.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while creating the profile.");
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
                <h3 style={{ color: "white" }}>프로파일 삭제</h3>
              </ModalHeaderTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
          </ModalPadding>
          <ModalContent>
            {responseMessage ? (
              <div
                style={{
                  padding: "20px 20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: `${formHeight}px`,
                }}
              >
                <img src={success} width={"40px"} />

                <p style={{ padding: "5px 5px", fontWeight: "bold" }}>
                  {responseMessage}
                </p>
              </div>
            ) : (
              <div ref={formContainerRef} style={{ padding: "100px 10px" }}>
                <p>프로파일 정보를 삭제하시겠습니까?</p>
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

export default DeleteProfileConfig;
