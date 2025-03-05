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
import Card from "../../components/Layout/Card";
import { editUser } from "../../recoil/atoms/user";

// Define the shape of form data and error messages
interface FormData {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

interface FormErrors {
  userId: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface WarningType {
  name: string | null;
  email: string | null;
  password: string | null;
  passwordConfirm: string | null;
}

// 사용자 정보 변경
const EditUser: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const initialValues = {
    userId: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const selectedRow = useRecoilValue(selectedRowAtom);
  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const [warning, setWarning] = useState<WarningType>({
    name: null,
    email: null,
    password: null,
    passwordConfirm: null,
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
      userId: selectedRow?.user_id,
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
    setErrors(initialValues);
    setWarning({
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormHeight(0); // Reset the height when closing the modal
    setWarning({
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
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
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
    }));
  };

  const isTwoPasswordTheSame = (p1: string, p2: string): boolean => {
    let isValid: boolean;

    if (p1 !== "" && p2 !== "" && p1 === p2) isValid = true;
    else {
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Filter out empty string values except for userId
    let updatedFormData: Partial<FormData> = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => key === "userId" || value !== ""
      )
    );

    // Validate passwords before sending request
    if (updatedFormData.password && updatedFormData.passwordConfirm) {
      if (
        !isTwoPasswordTheSame(
          updatedFormData.password,
          updatedFormData.passwordConfirm
        )
      ) {
        setResponseMessage("입력하신 비밀번호가 일치하지 않습니다.");
        return; // Stop execution if passwords do not match
      }
    }

    // Remove passwordConfirm from the final request payload
    delete updatedFormData.passwordConfirm;

    try {
      const result = await editUser(updatedFormData);
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
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="600px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>사용자 정보 변경</h3>
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
                    <FormLabel htmlFor="userId">사용자 ID</FormLabel>
                    <FormInput
                      type="text"
                      id="userId"
                      name="userId"
                      onChange={handleChange}
                      value={formData.userId}
                      disabled
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.userId && (
                    <FormError>{errors?.userId}</FormError>
                  )}

                  <FormRow>
                    <FormLabel htmlFor="name">사용자 이름</FormLabel>
                    <FormInput
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      placeholder="입력한 사항만 변경됩니다."
                      autoComplete="off"
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="email">사용자 이메일</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      placeholder="입력한 사항만 변경됩니다."
                      autoComplete="off"
                      // required
                    />
                  </FormRow>

                  <FormRow>
                    <FormLabel htmlFor="password">비밀번호</FormLabel>
                    <FormInput
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      placeholder="입력한 사항만 변경됩니다."
                      autoComplete="off"
                    />
                  </FormRow>

                  <FormRow>
                    <FormLabel htmlFor="passwordConfirm">
                      비밀번호 확인
                    </FormLabel>
                    <FormInput
                      type="password"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      onChange={handleChange}
                      value={formData.passwordConfirm}
                      placeholder="입력한 사항만 변경됩니다."
                      autoComplete="off"
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

export default EditUser;
