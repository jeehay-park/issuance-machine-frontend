import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  FormEvent,
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
  RadioInput,
  RadioLabel,
  FormSelect,
  FormButton,
  FormError,
} from "../../styles/styledForm";
import { MdClose, MdCheck } from "react-icons/md";
import { createMachine } from "../../recoil/atoms/machine";
import Card from "../../components/Layout/Card";

// Define the shape of form data and error messages
interface FormData {
  mcnId: null;
  mcnName: string | undefined;
  etc: string | number | undefined;
}

interface FormErrors {
  mcnId: null;
  mcnName: string | undefined;
  etc: string | number | undefined;
}

interface WarningType {
  mcnNameWarning: string | null;
}

// 디바이스 추가
const AddMachine: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const initialValues = {
    mcnId: null,
    mcnName: "",
    etc: "",
  };
  const selectedRow = useRecoilValue(selectedRowAtom);
  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const [warning, setWarning] = useState<WarningType>({
    mcnNameWarning: null,
  });

  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (formContainerRef.current) {
      console.log("formContainerRef.current : ", formContainerRef.current);
      console.log(
        "formContainerRef.current.offsetHeight : ",
        formContainerRef.current.offsetHeight
      );
      console.log(
        "formContainerRef.current.offsetWidth : ",
        formContainerRef.current.offsetWidth
      );
      setFormHeight(formContainerRef.current.offsetHeight);
      setFormWidth(formContainerRef.current.offsetWidth);
    }
  }, [formContainerRef, isModalOpen]);

  const openModal = () => {
    setResponseMessage(null);
    setModalOpen(true);
    setFormHeight(0); // Reset height when opening modal
    setFormData(initialValues);
    setErrors(initialValues);
    setWarning({
      mcnNameWarning: null,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData(initialValues);
    setErrors(initialValues);
    setFormHeight(0); // Reset the height when closing the modal
    setWarning({
      mcnNameWarning: null,
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

    setWarning((prev) => ({
      ...prev,
      mcnNameWarning: null,
    }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = initialValues;
    let isValid = true;

    if (!formData.mcnName) {
      tempErrors.mcnName = "mcnName is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (validate()) {
      try {
        const result = await createMachine(formData);
        if (result) {
          handleRefresh();
          setResponseMessage(result.header.rtnMessage);
          // Refresh data after creation
        } else {
          setResponseMessage("Failed to create machine.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while creating the machine.");
      }
    }
  };

  console.log("response width & height : ", formWidth, formHeight);

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="600px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>발급 기계 추가</h3>
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
                    <FormLabel htmlFor="mcnName">발급기 이름</FormLabel>
                    <FormInput
                      type="text"
                      id="mcnName"
                      name="mcnName"
                      onChange={handleChange}
                      value={formData.mcnName}
                      // required
                    />
                  </FormRow>
                  {warning.mcnNameWarning && <p>{warning.mcnNameWarning}</p>}
                  <FormRow>
                    <FormLabel htmlFor="etc">기타 정보</FormLabel>
                    <FormInput
                      type="text"
                      id="etc"
                      name="etc"
                      onChange={handleChange}
                      value={formData.etc}
                      // required
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

export default AddMachine;
