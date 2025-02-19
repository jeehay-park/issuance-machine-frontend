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
import { useSetRecoilState } from "recoil";
import success from "../../components/assets/green-tick.png";
import {
  FormContainer,
  FormRow,
  FormLabel,
  FormInput,
  FormError,
} from "../../styles/styledForm";
import { MdClose, MdCheck } from "react-icons/md";
import { signUp } from "../../recoil/atoms/auth";

// Define the shape of form data and error messages
interface FormData {
  userId: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  name: string | undefined;
  email: string | undefined;
}

interface FormErrors {
  userId: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  name: string | undefined;
  email: string | undefined;
}

interface WarningType {
  userIdWarning: string | null;
  passwordWarning: string | null;
  passwordConfirmWarning: string | null;
  nameWarning: string | null;
  emailWarning: string | null;
}

// 사용자 등록
const SignUp: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const initialValues = {
    userId: "",
    password: "",
    passwordConfirm: "",
    name: "",
    email: "",
  };

  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const [warning, setWarning] = useState<WarningType>({
    userIdWarning: null,
    passwordWarning: null,
    passwordConfirmWarning: null,
    nameWarning: null,
    emailWarning: null,
  });

  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isCountable = (cnt: string | number) => {
    if (Number.isInteger(Number(cnt))) {
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
    setFormData(initialValues);
    setErrors(initialValues);
    setWarning({
      userIdWarning: null,
      passwordWarning: null,
      passwordConfirmWarning: null,
      nameWarning: null,
      emailWarning: null,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData(initialValues);
    setErrors(initialValues);
    setFormHeight(0); // Reset the height when closing the modal
    setWarning({
      userIdWarning: null,
      passwordWarning: null,
      passwordConfirmWarning: null,
      nameWarning: null,
      emailWarning: null,
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
      userIdWarning: null,
      passwordWarning: null,
      passwordConfirmWarning: null,
      nameWarning: null,
      emailWarning: null,
    }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = initialValues;
    let isValid = true;

    if (!formData.userId) {
      tempErrors.userId = "UserId is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (validate()) {
      try {
        const result = await signUp(formData);
        if (result) {
          // handleRefresh();
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
                <h3 style={{ color: "white" }}>사용자 등록</h3>
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
                    <FormLabel htmlFor="userId">사용자 ID</FormLabel>
                    <FormInput
                      type="text"
                      id="userId"
                      name="userId"
                      onChange={handleChange}
                      value={formData.userId}
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
                      // required
                    />
                  </FormRow>
                  {warning.passwordWarning && <p>{warning.passwordWarning}</p>}
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
                    />
                  </FormRow>
                  {warning.passwordConfirmWarning && (
                    <p>{warning.passwordConfirmWarning}</p>
                  )}
                  <FormRow>
                    <FormLabel htmlFor="countSum">이메일</FormLabel>
                    <FormInput
                      type="text"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </FormRow>
                  {warning.emailWarning && <p>{warning.emailWarning}</p>}
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

export default SignUp;
