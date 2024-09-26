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
import { deleteCodeInfo } from "../../recoil/atoms/codeInfo";
import confetti from "canvas-confetti";
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

// Define the shape of form data and error messages
interface FormData {
  name: string;
  email: string;
}

interface FormErrors {
  name: string;
  email: string;
}

// 작업 추가
const AddWorkModal: React.FC<{
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
  const closeModal = () => setModalOpen(false);

  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    setModalOpen(false);
  };

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
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
    let tempErrors: FormErrors = { name: "", email: "" };
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    console.log(tempErrors);
    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "" });
      setErrors({ name: "", email: "" });
      setIsSubmitted(false); // Reset submission state
    }
    console.log("handle submit");
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="600px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>작업 추가</h3>
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
                <form onSubmit={handleSubmit}>
                  <FormRow>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      <div>
                        <RadioInput
                          type="radio"
                          name="option"
                          value="Option 1"
                          id="option1" // Assign an id for proper label association
                          onChange={handleChange}
                        />
                        <RadioLabel htmlFor="option1">
                          복제하여 작업 추가
                        </RadioLabel>
                      </div>
                      <div>
                        <RadioInput
                          type="radio"
                          name="option"
                          value="Option 2"
                          id="option2" // Assign an id for proper label association
                          onChange={handleChange}
                        />
                        <RadioLabel htmlFor="option2">
                          신규 작업 추가
                        </RadioLabel>
                      </div>
                    </div>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="name">파서창</FormLabel>
                    <FormInput
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.name && (
                    <FormError>{errors?.name}</FormError>
                  )}{" "}
                  {/* Render error if exists */}
                  <FormRow>
                    <FormLabel htmlFor="email">태그 이름</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="email">고객사</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="email">발주번호</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="email">디바이스 이름</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="category">프로그램 선택</FormLabel>
                    <FormSelect
                      id="category"
                      name="category"
                      onChange={handleChange}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="category">장비 선택</FormLabel>
                    <FormSelect
                      id="category"
                      name="category"
                      onChange={handleChange}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="category">규칙 선택</FormLabel>
                    <FormSelect
                      id="category"
                      name="category"
                      onChange={handleChange}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="category">발급칩 LOCK</FormLabel>
                    <FormSelect
                      id="category"
                      name="category"
                      onChange={handleChange}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="email">목표 수량</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="email">DUE</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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

export default AddWorkModal;
