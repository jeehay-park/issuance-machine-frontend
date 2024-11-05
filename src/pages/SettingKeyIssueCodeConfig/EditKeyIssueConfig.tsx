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
import { updateKeyIssue } from "../../recoil/atoms/setting";
import Card from "../../components/Layout/Card";

// Define the shape of form data and error messages
interface FormData {
  configType: "KEYISSUE";
  keyissueConfig: {
    keyisId?: string | null;
    keyisName: string | null;
    description: string | null;
    keyisType?: string | null;
    version: string | null;
    dataHash: string | null;
  };
}

interface FormErrors {
  keyissueConfig: {
    keyisId?: string | null;
    keyisName: string | null;
    description: string | null;
    keyisType?: string | null;
    version: string | null;
    dataHash: string | null;
  };
}

// 키발급코드 설정 변경
const EditKeyIssueConfig: React.FC<{
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
        configType: "KEYISSUE",
        keyissueConfig: {
          keyisId: selectedRow.keyis_id,
          keyisName: selectedRow.keyis_name,
          description: selectedRow.description,
          keyisType: selectedRow.keyis_type,
          version: selectedRow.version,
          dataHash: selectedRow.data_hash,
        },
      });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      configType: "KEYISSUE",
      keyissueConfig: {
        keyisId: null,
        keyisName: null,
        description: null,
        keyisType: null,
        version: null,
        dataHash: null,
      },
    });
    setErrors({
      keyissueConfig: {
        keyisId: null,
        keyisName: null,
        description: null,
        keyisType: null,
        version: null,
        dataHash: null,
      },
    });
    handleRefresh();
    setFormHeight(0); // Reset the height when closing the modal
    setSelectedRow(null);
  };

  const [formData, setFormData] = useState<FormData>({
    configType: "KEYISSUE",
    keyissueConfig: {
      keyisId: null,
      keyisName: null,
      description: null,
      keyisType: null,
      version: null,
      dataHash: null,
    },
  });

  const [errors, setErrors] = useState<FormErrors>({
    keyissueConfig: {
      keyisId: null,
      keyisName: null,
      description: null,
      keyisType: null,
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
      keyissueConfig: {
        ...prevData.keyissueConfig, // Spread the existing profileConfig
        [name]: value, // Update the specific field
      },
    }));

    // Clear error for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      keyissueConfig: {
        ...prevErrors.keyissueConfig,
        [name]: null, // Clear the specific error
      },
    }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = {
      keyissueConfig: {
        keyisId: null,
        keyisName: null,
        description: null,
        keyisType: null,
        version: null,
        dataHash: null,
      },
    };
    let isValid = true;

    if (!formData.keyissueConfig.keyisName) {
      tempErrors.keyissueConfig.keyisName = "profileConfig is required";
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
        const result = await updateKeyIssue(formData);
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
                <h3 style={{ color: "white" }}>키발급코드 변경</h3>
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
                    <FormLabel htmlFor="keyisName">이름</FormLabel>
                    <FormInput
                      type="text"
                      id="keyisName"
                      name="keyisName"
                      onChange={handleChange}
                      value={formData.keyissueConfig?.keyisName ?? ""}
                      //   placeholder={formData.profileConfig?.profName ?? ""}
                    />
                  </FormRow>
                  {isSubmitted && errors?.keyissueConfig.keyisName && (
                    <FormError>{errors?.keyissueConfig.keyisName}</FormError>
                  )}{" "}
                  <FormRow>
                    <FormLabel htmlFor="description">상세 설명</FormLabel>
                    <FormInput
                      type="text"
                      id="description"
                      name="description"
                      onChange={handleChange}
                      value={formData.keyissueConfig?.description ?? ""}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="keyisType">타입</FormLabel>
                    <FormInput
                      type="text"
                      id="keyisType"
                      name="keyisType"
                      onChange={handleChange}
                      value={formData.keyissueConfig?.keyisType ?? ""}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="version">버전</FormLabel>
                    <FormInput
                      type="text"
                      id="version"
                      name="version"
                      onChange={handleChange}
                      value={formData.keyissueConfig?.version ?? ""}
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
                      value={formData.keyissueConfig?.dataHash ?? ""}
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

export default EditKeyIssueConfig;
