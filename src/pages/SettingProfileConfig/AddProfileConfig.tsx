import React, { useState, ReactNode, FormEvent, ChangeEvent } from "react";
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
import { useRecoilValue } from "recoil";
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
import { createProfile } from "../../recoil/atoms/setting";

// Define the shape of form data and error messages
interface FormData {
  name: string | null;
  workNo: string | null;
  programNo: string | null;
  configType: "PROFILE";
}

interface FormErrors {
  name: string | null;
  workNo: string | null;
  programNo: string | null;
}

// Profile 설정 추가
const AddProfileConfig: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const selectedRow = useRecoilValue(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const openModal = () => {
    setResponseMessage(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      name: null,
      workNo: null,
      programNo: null,
      configType: "PROFILE",
    });
    setErrors({
      name: null,
      workNo: null,
      programNo: null,
    });
  };

  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    setModalOpen(false);
  };

  const [formData, setFormData] = useState<FormData>({
    name: null,
    workNo: null,
    programNo: null,
    configType: "PROFILE",
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: null,
    workNo: null,
    programNo: null,
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear error for the current field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = {
      name: null,
      workNo: null,
      programNo: null,
    };
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = "Name is required";
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
          handleRefresh(); // Refresh data after creation
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
                <h3 style={{ color: "white" }}>Profile 추가</h3>
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
                }}
              >
                <img src={success} width={"40px"} />

                <p style={{ padding: "5px 5px", fontWeight: "bold" }}>
                  {responseMessage}
                </p>
              </div>
            ) : (
              <FormContainer>
                <form>
                  <FormRow>
                    <FormLabel htmlFor="name">작업명</FormLabel>
                    <FormInput
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.name && (
                    <FormError>{errors?.name}</FormError>
                  )}{" "}
                  <FormRow>
                    <FormLabel htmlFor="name">작업번호</FormLabel>
                    <FormInput
                      type="text"
                      id="workNo"
                      name="workNo"
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="name">프로그램번호</FormLabel>
                    <FormInput
                      type="text"
                      id="programNo"
                      name="programNo"
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="name">설정 구분</FormLabel>
                    <FormInput
                      type="text"
                      id="configType"
                      name="configType"
                      value={formData.configType}
                      readOnly
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
                  onClick={handleSubmit}
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
