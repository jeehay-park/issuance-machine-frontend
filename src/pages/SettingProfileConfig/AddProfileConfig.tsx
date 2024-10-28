import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  ChangeEvent,
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
  FormError,
} from "../../styles/styledForm";
import { MdClose, MdCheck } from "react-icons/md";
import { createProfile } from "../../recoil/atoms/setting";

// Define the shape of form data and error messages
interface FormData {
  configType: "PROFILE";
  profileConfig: {
    profId?: string | null;
    profName: string | null;
    description: string | null;
    profType?: string | null;
    version: string | null;
    ctntData: string | null;
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
    ctntData: string | null;
    dataHash: string | null;
  };
}

// Profile 설정 추가
const AddProfileConfig: React.FC<{
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
    setFormData({
      configType: "PROFILE",
      profileConfig: {
        profId: null,
        profName: null,
        description: null,
        profType: null,
        version: null,
        ctntData: null,
        dataHash: null,
      },
    });
    setErrors({
      profileConfig: {
        profId: null,
        profName: null,
        description: null,
        profType: null,
        version: null,
        ctntData: null,
        dataHash: null,
      },
    });
    setFormHeight(0); // Reset the height when closing the modal
    setSelectedRow(null);
  };

  const [formData, setFormData] = useState<FormData>({
    configType: "PROFILE",
    profileConfig: {
      profId: null,
      profName: null,
      description: null,
      profType: null,
      version: null,
      ctntData: null,
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
      ctntData: null,
      dataHash: null,
    },
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      profileConfig: {
        ...prevData.profileConfig, // Spread the existing profileConfig
        [name]: value, // Update the specific field
      },
    }));

    // Clear error for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      profileConfig: {
        ...prevErrors.profileConfig,
        [name]: null, // Clear the specific error
      },
    }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = {
      profileConfig: {
        profId: null,
        profName: null,
        description: null,
        profType: null,
        version: null,
        ctntData: null,
        dataHash: null,
      },
    };
    let isValid = true;

    if (!formData.profileConfig.profName) {
      tempErrors.profileConfig.profName = "profileConfig is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (validate()) {
      try {
        const result = await createProfile(formData);
        if (result) {
          handleRefresh();
          setResponseMessage(result.header.rtnMessage);
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
                <h3 style={{ color: "white" }}>프로파일 추가</h3>
              </ModalHeaderTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
          </ModalPadding>
          <ModalContent>
            {responseMessage ? (
              <FormContainer
                style={{
                  // padding: "20px 20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: `${formWidth}px`,
                  height: `${formHeight}px`,
                }}
              >
                <div
                  style={{
                    // padding: "20px 20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: `${formWidth}px`,
                    height: `${formHeight}px`,
                  }}
                >
                  <img src={success} width={"40px"} />
                  <p style={{ padding: "5px 5px", fontWeight: "bold" }}>
                    {responseMessage}
                  </p>
                </div>
              </FormContainer>
            ) : (
              <FormContainer ref={formContainerRef}>
                <form>
                  <FormRow>
                    <FormLabel htmlFor="profName">이름</FormLabel>
                    <FormInput
                      type="text"
                      id="profName"
                      name="profName"
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.profileConfig.profName && (
                    <FormError>{errors?.profileConfig.profName}</FormError>
                  )}{" "}
                  <FormRow>
                    <FormLabel htmlFor="description">상세 설명</FormLabel>
                    <FormInput
                      type="text"
                      id="description"
                      name="description"
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="profType">타입</FormLabel>
                    <FormInput
                      type="text"
                      id="profType"
                      name="profType"
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="version">버전</FormLabel>
                    <FormInput
                      type="text"
                      id="version"
                      name="version"
                      onChange={handleChange}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="ctntData">컨텐츠 데이터</FormLabel>
                    <FormInput
                      type="text"
                      id="ctntData"
                      name="ctntData"
                      onChange={handleChange}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="dataHash">데이터 해시</FormLabel>
                    <FormInput
                      type="text"
                      id="dataHash"
                      name="dataHash"
                      onChange={handleChange}
                    />
                  </FormRow>
                </form>
              </FormContainer>
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

export default AddProfileConfig;
