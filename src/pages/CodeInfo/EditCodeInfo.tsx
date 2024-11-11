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
import { createSnrule } from "../../recoil/atoms/snrule";
import Card from "../../components/Layout/Card";
import { updateCode } from "../../recoil/atoms/code" 

// Define the shape of form data and error messages
interface FormData {
  codeName: string | undefined;
  codeGroup: string | undefined;
  description: string | undefined;
  status: string | undefined;
}

interface FormErrors {
  codeName: string | undefined;
  codeGroup: string | undefined;
  description: string | undefined;
  status: string | undefined;
}

interface WarningType {
  codeName: string | null;
  codeGroup: string | null;
}

// 코드 정보 변경
const EditCodeInfo: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const initialValues = {
    codeName: "",
    codeGroup: "",
    description: "",
    status: "",
  };
  const selectedRow = useRecoilValue(selectedRowAtom);
  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const [warning, setWarning] = useState<WarningType>({
    codeName: null,
    codeGroup: null,
  });

  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
    setFormData({
        codeName: selectedRow?.code_name,
        codeGroup: selectedRow?.code_group,
        description: selectedRow?.description,
        status: selectedRow?.status,
    });
    setErrors(initialValues);
    setWarning({
        codeName: null,
        codeGroup: null,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData(initialValues);
    setErrors(initialValues);
    setFormHeight(0); // Reset the height when closing the modal
    setWarning({
        codeName: null,
        codeGroup: null,
    });
    setSelectedRow(null);
  };

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Clear error for the current field
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));

      setWarning((prev) => ({
        ...prev,
        todayCountWarning: null,
        countSumWarning: null,
      }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = initialValues;
    let isValid = true;

    if (!formData.codeName) {
      tempErrors.codeName = "codeName is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (validate()) {
      try {
        const result = await updateCode(formData);
        if (result) {
          handleRefresh();
          setResponseMessage(result.header.rtnMessage);
          // Refresh data after creation
        } else {
          setResponseMessage("Failed to edit code info.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while editing the code info.");
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
                <h3 style={{ color: "white" }}>코드 정보 변경</h3>
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
                    <FormLabel htmlFor="codeName">코드 이름</FormLabel>
                    <FormInput
                      type="text"
                      id="codeName"
                      name="codeName"
                      onChange={handleChange}
                      value={formData.codeName}
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.codeName && (
                    <FormError>{errors?.codeName}</FormError>
                  )}

                  <FormRow>
                    <FormLabel htmlFor="testCode">코드 그룹</FormLabel>
                    <FormInput
                       type="text"
                       id="codeGroup"
                       name="codeGroup"
                       onChange={handleChange}
                       value={formData.codeGroup}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="todayCount">상세 설명</FormLabel>
                    <FormInput
                       type="text"
                       id="description"
                       name="description"
                       onChange={handleChange}
                       value={formData.description}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="countSum">상태</FormLabel>
                    <FormInput
                      type="text"
                      id="status"
                      name="status"
                      onChange={handleChange}
                      value={formData.status}
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

export default EditCodeInfo;
