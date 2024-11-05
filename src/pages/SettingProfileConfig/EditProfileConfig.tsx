import React, {
  useState,
  ReactNode,
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
  FormError,
} from "../../styles/styledForm";
import { MdClose, MdCheck } from "react-icons/md";
import { createProfile } from "../../recoil/atoms/setting";
import Card from "../../components/Layout/Card";

// Define the shape of form data and error messages
interface FormData {
  configType: "PROFILE";
  profileConfig: {
    profId?: string | null;
    profName: string | null;
    description: string | null;
    profType?: string | null;
    version: string | null;
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
    dataHash: string | null;
  };
}

// 프로파일 설정 변경
const EditProfileConfig: React.FC<{
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
    if (selectedRow) {
      setFormData({
        configType: "PROFILE",
        profileConfig: {
          profId: selectedRow.prof_id,
          profName: selectedRow.prof_name,
          description: selectedRow.description,
          profType: selectedRow.prof_type,
          version: selectedRow.version,
          dataHash: selectedRow.data_hash,
        },
      });
    }
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
        dataHash: null,
      },
    });
    handleRefresh();
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
    console.log(formData);

    if (validate()) {
      try {
        const result = await createProfile(formData);

        console.log(result);

        if (result) {
          setResponseMessage(result.header.rtnMessage);
          handleRefresh();
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
                <h3 style={{ color: "white" }}>프로파일 변경</h3>
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
              <FormContainer ref={formContainerRef}>
                <form>
                  <FormRow>
                    <FormLabel htmlFor="profName">이름</FormLabel>
                    <FormInput
                      type="text"
                      id="profName"
                      name="profName"
                      onChange={handleChange}
                      value={formData.profileConfig?.profName ?? ""}
                      //   placeholder={formData.profileConfig?.profName ?? ""}
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
                      value={formData.profileConfig?.description ?? ""}
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
                      value={formData.profileConfig?.profType ?? ""}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="version">버전</FormLabel>
                    <FormInput
                      type="text"
                      id="version"
                      name="version"
                      onChange={handleChange}
                      value={formData.profileConfig?.version ?? ""}
                    />
                  </FormRow>
                  {/* <FormRow>
                    <FormLabel htmlFor="ctntData">컨텐츠 데이터</FormLabel>
                    <FormInput
                      type="text"
                      id="ctntData"
                      name="ctntData"
                      onChange={handleChange}
                    />
                  </FormRow> */}
                  <FormRow>
                    <FormLabel htmlFor="dataHash">데이터 해시</FormLabel>
                    <FormInput
                      type="text"
                      id="dataHash"
                      name="dataHash"
                      onChange={handleChange}
                      value={formData.profileConfig?.dataHash ?? ""}
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

export default EditProfileConfig;
