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
import { deleteCode } from "../../recoil/atoms/code";
import confetti from "canvas-confetti";
import success from "../../components/assets/green-tick.png";
import {
  FormContainer,
  FormRow,
  FormLabel,
  FormInput,
  FormTextArea,
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
  parser?: string;
  tag_name: string;
  customer: string;
  order_no: string;
  device_name: string;
  prog_id: string;
  mcn_id: string;
  snr_id: string;
  is_lock: string;
  target_size: string;
  due_date: string;
}

interface FormErrors {
  parser?: string;
  tag_name: string;
  customer: string;
  order_no: string;
  device_name: string;
  prog_id: string;
  mcn_id: string;
  snr_id: string;
  is_lock: string;
  target_size: string;
  due_date: string;
}

// 작업 복제
const CopyWorkModal: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const selectedRow = useRecoilValue(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  console.log(selectedRow);
  const openModal = () => {
    setFormData(defaultData);
    setErrors(defaultData);
    setResponseMessage(null);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    setModalOpen(false);
  };

  const defaultData = {
    parser: "",
    tag_name: "",
    customer: "",
    order_no: "",
    device_name: "",
    prog_id: "",
    mcn_id: "",
    snr_id: "",
    is_lock: "",
    target_size: "",
    due_date: "",
  };

  const [formData, setFormData] = useState<FormData>(defaultData);
  const [errors, setErrors] = useState<FormErrors>(defaultData);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "parser") {
      const arr = value.split("	");

      setFormData((prevData) => ({
        ...prevData,

        due_date: arr[0],
        device_name: arr[1],
        customer: arr[2],

        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = defaultData;
    let isValid = true;

    if (!formData.tag_name) {
      tempErrors.tag_name = "Name is required";
      isValid = false;
    }

    if (!formData.customer) {
      tempErrors.customer = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.customer)) {
      tempErrors.customer = "Email is invalid";
      isValid = false;
    }

    console.log(tempErrors);
    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    // e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      setFormData(defaultData);
      setErrors(defaultData);
      setIsSubmitted(false); // Reset submission state
    }
    console.log("handle submit");
    console.log(formData);
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="600px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>작업 복제</h3>
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
                    <FormLabel htmlFor="parser">파서창</FormLabel>
                    <FormTextArea
                      id="parser"
                      name="parser"
                      value={formData.parser}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>

                  <FormRow>
                    <FormLabel htmlFor="tag_name">태그 이름</FormLabel>
                    <FormInput
                      type="text"
                      id="tag_name"
                      name="tag_name"
                      value={formData.tag_name}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.tag_name && (
                    <FormError>{errors?.tag_name}</FormError>
                  )}
                  <FormRow>
                    <FormLabel htmlFor="customer">고객사</FormLabel>
                    <FormInput
                      type="text"
                      id="customer"
                      name="customer"
                      value={formData.customer}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="order_no">발주번호</FormLabel>
                    <FormInput
                      type="text"
                      id="order_no"
                      name="order_no"
                      value={formData.order_no}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="device_name">디바이스 이름</FormLabel>
                    <FormInput
                      type="text"
                      id="device_name"
                      name="device_name"
                      value={formData.device_name}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="prog_id">프로그램 선택</FormLabel>
                    <FormSelect
                      id="prog_id"
                      name="prog_id"
                      onChange={handleChange}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="mcn_id">장비 선택</FormLabel>
                    <FormSelect
                      id="mcn_id"
                      name="mcn_id"
                      onChange={handleChange}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="snr_id">규칙 선택</FormLabel>
                    <FormSelect
                      id="snr_id"
                      name="snr_id"
                      onChange={handleChange}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="is_lock">발급칩 LOCK</FormLabel>
                    <FormSelect
                      id="is_lock"
                      name="is_lock"
                      onChange={handleChange}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="target_size">목표 수량</FormLabel>
                    <FormInput
                      type="text"
                      id="target_size"
                      name="target_size"
                      value={formData.target_size}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="due_date">DUE</FormLabel>
                    <FormInput
                      type="text"
                      id="due_date"
                      name="due_date"
                      value={formData.due_date}
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

export default CopyWorkModal;
