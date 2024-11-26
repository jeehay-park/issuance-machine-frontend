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
  FormSelect,
} from "../../styles/styledForm";
import { MdClose, MdCheck } from "react-icons/md";
import Card from "../../components/Layout/Card";
import { updateProgram, updateProgramAtom } from "../../recoil/atoms/program";

// Define the shape of form data and error messages
interface FormData {
  progId: null;
  progName: string;
  description: string | null;
  product: string;
  sessionHandler: string;
  testCode: string | null;
  etcOption: string[];
  profId: string;
  keyisId: string | null;
  scrtId: string | null;
  isEncryptSn: boolean;
  companyCode: string | null;
  countryCode: string | null;
  interfaceType: string | null;
  packageType: string | null;
  status: string;
}

interface FormErrors {
  progName: string;
  product: string;
  sessionHandler: string;
  profId: string;
  status: string;
}

// 프로그램 변경
const EditProgram: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const initialValues = {
    progId: null,
    progName: "",
    description: null,
    product: "",
    sessionHandler: "",
    testCode: null,
    etcOption: [],
    profId: "",
    keyisId: null,
    scrtId: null,
    isEncryptSn: true,
    companyCode: null,
    countryCode: null,
    interfaceType: null,
    packageType: null,
    status: "",
  };
  const selectedRow = useRecoilValue(selectedRowAtom);
  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

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
      progId: selectedRow?.prog_id,
      progName: selectedRow?.prog_name,
      description: selectedRow?.description,
      product: selectedRow?.product,
      sessionHandler: selectedRow?.session_handler,
      testCode: selectedRow?.test_code,
      etcOption: selectedRow?.etc_option.split("|"),
      profId: selectedRow?.prof_id,
      keyisId: selectedRow?.keyis_id,
      scrtId: selectedRow?.scrt_id,
      isEncryptSn: selectedRow?.is_encrypted_sn,
      companyCode: selectedRow?.company_code,
      countryCode: selectedRow?.country_code,
      interfaceType: selectedRow?.interface_type,
      packageType: selectedRow?.package_type,
      status: selectedRow?.status,
    });
    setErrors(initialValues);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData(initialValues);
    setErrors(initialValues);
    setFormHeight(0); // Reset the height when closing the modal
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
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = initialValues;
    let isValid = true;

    if (!formData.progName) {
      tempErrors.progName = "progName is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (validate()) {
      try {
        const result = await updateProgram(formData);
        if (result) {
          handleRefresh();
          setResponseMessage(result.header.rtnMessage);
          // Refresh data after creation
        } else {
          setResponseMessage("Failed to update the program.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while updating the program.");
      }
    }
  };

  const cancelEtcOption = (item: string) => {
    let temp = [...formData.etcOption];

    const index = temp.indexOf(item);
    if (index !== -1) {
      temp.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        etcOption: temp,
      }));
    }
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="700px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>프로그램 변경</h3>
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
                    <FormLabel htmlFor="progName">이름</FormLabel>
                    <FormInput
                      type="text"
                      id="progName"
                      name="progName"
                      onChange={handleChange}
                      value={formData?.progName}
                    />
                  </FormRow>
                  {isSubmitted && errors?.progName && (
                    <FormError>{errors?.progName}</FormError>
                  )}{" "}
                  <FormRow>
                    <FormLabel htmlFor="description">상세 설명</FormLabel>
                    <FormInput
                      type="text"
                      id="description"
                      name="description"
                      onChange={handleChange}
                      value={formData?.description ?? ""}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="product">제품(Chip)</FormLabel>
                    <FormInput
                      type="text"
                      id="product"
                      name="product"
                      onChange={handleChange}
                      value={formData?.product ?? ""}
                    />
                    <FormLabel
                      htmlFor="sessionHandler"
                      style={{ marginLeft: "1rem" }}
                    >
                      세션 핸들러
                    </FormLabel>
                    <FormInput
                      type="text"
                      id="sessionHandler"
                      name="sessionHandler"
                      onChange={handleChange}
                      value={formData?.sessionHandler ?? ""}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="testCode">테스트 코드</FormLabel>
                    <FormInput
                      type="text"
                      id="testCode"
                      name="testCode"
                      value={formData?.testCode ?? ""}
                      onChange={handleChange}
                    />
                    <FormLabel htmlFor="status" style={{ marginLeft: "1rem" }}>
                      상태
                    </FormLabel>
                    <FormInput
                      type="text"
                      id="status"
                      name="status"
                      value={formData?.status ?? ""}
                      onChange={handleChange}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="profId">프로파일 ID</FormLabel>
                    <FormInput
                      type="text"
                      id="profId"
                      name="profId"
                      value={formData?.profId ?? ""}
                      onChange={handleChange}
                    />
                    <FormLabel htmlFor="keyisId" style={{ marginLeft: "1rem" }}>
                      키발급코드 ID
                    </FormLabel>
                    <FormInput
                      type="text"
                      id="keyisId"
                      name="keyisId"
                      value={formData?.keyisId ?? ""}
                      onChange={handleChange}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="scrtId">스크립트 ID</FormLabel>
                    <FormInput
                      type="text"
                      id="scrtId"
                      name="scrtId"
                      value={formData?.scrtId ?? ""}
                      onChange={handleChange}
                    />
                    <FormLabel
                      htmlFor="isEncryptSn"
                      style={{ marginLeft: "1rem" }}
                    >
                      SN 암호화
                    </FormLabel>
                    <FormInput
                      type="checkbox"
                      id="isEncryptSn"
                      name="isEncryptSn"
                      checked={formData?.isEncryptSn}
                      onChange={handleChange}
                    />
                  </FormRow>
                  <FormRow></FormRow>
                  <FormRow>
                    <FormLabel htmlFor="companyCode">회사코드</FormLabel>
                    <FormInput
                      type="text"
                      id="companyCode"
                      name="companyCode"
                      value={formData?.companyCode ?? ""}
                      onChange={handleChange}
                    />
                    <FormLabel
                      htmlFor="countryCode"
                      style={{ marginLeft: "1rem" }}
                    >
                      국가코드
                    </FormLabel>
                    <FormInput
                      type="text"
                      id="countryCode"
                      name="countryCode"
                      value={formData?.countryCode ?? ""}
                      onChange={handleChange}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="interfaceType">
                      인터페이스 타입
                    </FormLabel>
                    <FormInput
                      type="text"
                      id="interfaceType"
                      name="interfaceType"
                      value={formData?.interfaceType ?? ""}
                      onChange={handleChange}
                    />
                    <FormLabel
                      htmlFor="packageType"
                      style={{ marginLeft: "1rem" }}
                    >
                      패키지 타입
                    </FormLabel>
                    <FormInput
                      type="text"
                      id="packageType"
                      name="packageType"
                      value={formData?.packageType ?? ""}
                      onChange={handleChange}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="etcOption">기타코드 옵션</FormLabel>
                    <FormSelect name="etcOption" onChange={handleChange}>
                      <option value="option1">option1</option>
                      <option value="option2">option2</option>
                      <option value="option3">option3</option>
                      <option value="option4">option4</option>
                      <option value="option5">option5</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow style={{ flexWrap: "wrap", gap: "0.5rem" }}>
                    {formData?.etcOption.map((item) => (
                      <div
                        style={{
                          marginRight: " 1rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.5rem",
                          padding: "0.2rem 0.5rem",
                        }}
                        onClick={() => cancelEtcOption(item)}
                      >
                        {item}
                        <span
                          style={{ color: "var(--red)", marginLeft: " 0.5rem" }}
                        >
                          &times;
                        </span>
                      </div>
                    ))}
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

export default EditProgram;
