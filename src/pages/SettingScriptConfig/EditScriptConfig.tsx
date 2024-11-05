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
import { updateScript } from "../../recoil/atoms/setting";
import Card from "../../components/Layout/Card";

// Define the shape of form data and error messages
interface FormData {
  configType: "SCRIPT";
  scriptConfig: {
    scrtId?: string | null;
    scrtName: string | null;
    description: string | null;
    scrtType?: string | null;
    version: string | null;
    dataHash: string | null;
  };
}

interface FormErrors {
  scriptConfig: {
    scrtId?: string | null;
    scrtName: string | null;
    description: string | null;
    scrtType?: string | null;
    version: string | null;
    dataHash: string | null;
  };
}

// 스크립트 설정 변경
const EditScriptConfig: React.FC<{
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
        configType: "SCRIPT",
        scriptConfig: {
          scrtId: selectedRow.scrt_id,
          scrtName: selectedRow.scrt_name,
          description: selectedRow.description,
          scrtType: selectedRow.scrt_type,
          version: selectedRow.version,
          dataHash: selectedRow.data_hash,
        },
      });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      configType: "SCRIPT",
      scriptConfig: {
        scrtId: null,
        scrtName: null,
        description: null,
        scrtType: null,
        version: null,
        dataHash: null,
      },
    });
    setErrors({
      scriptConfig: {
        scrtId: null,
        scrtName: null,
        description: null,
        scrtType: null,
        version: null,
        dataHash: null,
      },
    });
    handleRefresh();
    setFormHeight(0); // Reset the height when closing the modal
    setSelectedRow(null);
  };

  const [formData, setFormData] = useState<FormData>({
    configType: "SCRIPT",
    scriptConfig: {
      scrtId: null,
      scrtName: null,
      description: null,
      scrtType: null,
      version: null,
      dataHash: null,
    },
  });

  const [errors, setErrors] = useState<FormErrors>({
    scriptConfig: {
      scrtId: null,
      scrtName: null,
      description: null,
      scrtType: null,
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
      scriptConfig: {
        ...prevData.scriptConfig, // Spread the existing profileConfig
        [name]: value, // Update the specific field
      },
    }));

    // Clear error for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      scriptConfig: {
        ...prevErrors.scriptConfig, // Spread the existing profileConfig
        [name]: value, // Update the specific field
      },
    }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = {
      scriptConfig: {
        scrtId: null,
        scrtName: null,
        description: null,
        scrtType: null,
        version: null,
        dataHash: null,
      },
    };
    let isValid = true;

    if (!formData.scriptConfig.scrtName) {
      tempErrors.scriptConfig.scrtName = "scriptConfig is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (validate()) {
      try {
        const result = await updateScript(formData);

        if (result) {
          setResponseMessage(result.header.rtnMessage);
          handleRefresh();
        } else {
          setResponseMessage("Failed to edit script.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while editing the script.");
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
                <h3 style={{ color: "white" }}>스크립트 변경</h3>
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
                      value={formData.scriptConfig?.scrtName ?? ""}
                      //   placeholder={formData.profileConfig?.profName ?? ""}
                    />
                  </FormRow>
                  {isSubmitted && errors?.scriptConfig.scrtName && (
                    <FormError>{errors?.scriptConfig.scrtName}</FormError>
                  )}{" "}
                  <FormRow>
                    <FormLabel htmlFor="description">상세 설명</FormLabel>
                    <FormInput
                      type="text"
                      id="description"
                      name="description"
                      onChange={handleChange}
                      value={formData.scriptConfig?.description ?? ""}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="scrtType">타입</FormLabel>
                    <FormInput
                      type="text"
                      id="scrtType"
                      name="scrtType"
                      onChange={handleChange}
                      value={formData.scriptConfig?.scrtType ?? ""}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="version">버전</FormLabel>
                    <FormInput
                      type="text"
                      id="version"
                      name="version"
                      onChange={handleChange}
                      value={formData.scriptConfig?.version ?? ""}
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
                      value={formData.scriptConfig?.dataHash ?? ""}
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

export default EditScriptConfig;
