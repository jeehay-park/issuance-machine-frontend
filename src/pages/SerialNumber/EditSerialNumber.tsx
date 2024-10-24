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

// Define the shape of form data and error messages
interface FormData {
  snrName: string | undefined;
  testCode: string | undefined;
  todayCount: string | number | undefined;
  countSum: string | number | undefined;
}

interface FormErrors {
  snrName: string | null;
  testCode: string | null;
  todayCount: string | number | undefined;
  countSum: string | number | undefined;
}

interface WarningType {
  todayCountWarning: string | null;
  countSumWarning: string | null;
}

// 시리얼 넘버 변경
const EditSerialNumber: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const initialValues = {
    snrName: "",
    testCode: "",
    todayCount: "",
    countSum: "",
  };
  const selectedRow = useRecoilValue(selectedRowAtom);
  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const [warning, setWarning] = useState<WarningType>({
    todayCountWarning: null,
    countSumWarning: null,
  });

  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isCountable = (cnt: string | number) => {
    const dt = typeof cnt;

    if (dt === "number" && Number.isInteger(cnt)) {
      return true;
    } else {
      return false;
    }
  };

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
      snrName: selectedRow?.snr_name,
      testCode: selectedRow?.test_code,
      todayCount: selectedRow?.today_count,
      countSum: selectedRow?.count_sum,
    });
    setErrors(initialValues);
    setWarning({
      todayCountWarning: null,
      countSumWarning: null,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData(initialValues);
    setErrors(initialValues);
    setFormHeight(0); // Reset the height when closing the modal
    setWarning({
      todayCountWarning: null,
      countSumWarning: null,
    });
    setSelectedRow(null);
  };

  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    setModalOpen(false);
  };

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "todayCount" && value && !isCountable(value)) {
      setWarning((prev) => ({
        ...prev,
        todayCountWarning: "유효한 숫자가 아님",
      }));
    } else if (name === "countSum" && value && !isCountable(value)) {
      setWarning((prev) => ({
        ...prev,
        countSumWarning: "유효한 숫자가 아님",
      }));
    } else {
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
    }
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = initialValues;
    let isValid = true;

    if (!formData.snrName) {
      tempErrors.snrName = "snrName is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (validate()) {
      try {
        const result = await createSnrule(formData);
        if (result) {
          handleRefresh();
          setResponseMessage(result.header.rtnMessage);
          // Refresh data after creation
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
                <h3 style={{ color: "white" }}>시리얼 넘버 규칙 변경</h3>
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
                    <FormLabel htmlFor="snrName">SN 규칙 이름</FormLabel>
                    <FormInput
                      type="text"
                      id="snrName"
                      name="snrName"
                      onChange={handleChange}
                      value={formData.snrName}
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.snrName && (
                    <FormError>{errors?.snrName}</FormError>
                  )}

                  <FormRow>
                    <FormLabel htmlFor="testCode">테스트 코드</FormLabel>
                    <FormInput
                      type="text"
                      id="testCode"
                      name="testCode"
                      onChange={handleChange}
                      value={formData.testCode}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="todayCount">금일 건수</FormLabel>
                    <FormInput
                      type="text"
                      id="todayCount"
                      name="todayCount"
                      onChange={handleChange}
                      value={formData.todayCount}
                      // required
                    />
                  </FormRow>
                  {warning.todayCountWarning && (
                    <p>{warning.todayCountWarning}</p>
                  )}
                  <FormRow>
                    <FormLabel htmlFor="countSum">건수 합계</FormLabel>
                    <FormInput
                      type="text"
                      id="countSum"
                      name="countSum"
                      onChange={handleChange}
                      value={formData.countSum}
                    />
                  </FormRow>
                  {warning.countSumWarning && <p>{warning.countSumWarning}</p>}
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

export default EditSerialNumber;
