import React, {
  useEffect,
  useState,
  useRef,
  ReactNode,
  ChangeEvent,
} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { createWorkHandler } from "../../recoil/atoms/work";
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
import { fetchWorkId } from "../../recoil/atoms/work";
import { fetchDeviceId } from "../../recoil/atoms/device";
import { createOptions } from "../../utils/createOptions";
import { tabStateAtom } from "../../recoil/atoms/selected";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

interface FormData {
  workId: string | undefined;
  dvcId: string | undefined;
  hdlName: string | undefined;
}

interface FormErrors {
  workId: string | undefined;
  dvcId: string | undefined;
  hdlName: string | undefined;
}

interface WarningType {
  workId: string | null;
  dvcId: string | null;
  hdlName: string | null;
}

const CheckSerialNumberDuplicationModal: React.FC<{
  children: ReactNode;
  handleRefresh?: () => void;
}> = ({ children, handleRefresh }) => {
  const [tabState, setTabState] = useRecoilState(tabStateAtom);
  const location = useLocation();
  const segments = location.pathname.split("/");
  const selectedTab = segments[2];

  const initialValues = {
    workId: tabState?.[selectedTab]?.work_id,
    dvcId: "",
    hdlName: "",
  };

  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const [warning, setWarning] = useState<WarningType>({
    workId: null,
    dvcId: null,
    hdlName: null,
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
    setFormData(initialValues);
    setErrors(initialValues);
    setWarning({
      workId: null,
      dvcId: null,
      hdlName: null,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData(initialValues);
    setErrors(initialValues);
    setFormHeight(0); // Reset the height when closing the modal
    setWarning({
      workId: null,
      dvcId: null,
      hdlName: null,
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
      workId: null,
      dvcId: null,
      hdlName: null,
    }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = initialValues;
    let isValid = true;

    if (!formData.workId) {
      tempErrors.workId = "workId is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (validate()) {
      try {
        const result = await createWorkHandler(formData);
        if (result) {
          //   handleRefresh();
          setResponseMessage(result.header.rtnMessage);
          // Refresh data after creation
        } else {
          setResponseMessage("Failed to create code info.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while creating the code info.");
      }
    }
  };

  const [workIds, setWorkIds] = useState([]);
  const [deviceIds, setDeviceIds] = useState([]);

  useEffect(() => {
    const fetchWorkIds = async () => {
      const result = await fetchWorkId();
      if (result) {
        setWorkIds(result.body.workIdList);
      }
    };

    const fetchDvcIds = async () => {
      const result = await fetchDeviceId();
      if (result) {
        setDeviceIds(result.body.deviceIdList);
      }
    };

    if (isModalOpen) {
      fetchWorkIds();
      fetchDvcIds();
    }
  }, [isModalOpen ? isModalOpen : undefined]);

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="600px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>SN 중복확인</h3>
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
                    <FormLabel htmlFor="dvcId">작업 ID</FormLabel>
                    <FormInput
                      type="text"
                      id="hdlName"
                      name="workId"
                      onChange={handleChange}
                      placeholder={tabState?.[selectedTab]?.work_id}
                      disabled
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.dvcId && (
                    <FormError>{errors?.dvcId}</FormError>
                  )}

                  <FormRow>
                    <FormLabel htmlFor="workId">작업명</FormLabel>
                    <FormInput
                      type="text"
                      id="hdlName"
                      name="workId"
                      onChange={handleChange}
                      placeholder={tabState?.[selectedTab]?.work_id}
                      disabled
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.workId && (
                    <FormError>{errors?.workId}</FormError>
                  )}

                  <FormRow>
                    <FormLabel htmlFor="hdlName">세션 갯수</FormLabel>
                    <FormInput
                      type="text"
                      id="hdlName"
                      name="hdlName"
                      onChange={handleChange}
                      value={formData.hdlName}
                      // required
                    />
                  </FormRow>

                  <FormRow>
                    <FormLabel htmlFor="hdlName">반복 횟수</FormLabel>
                    <FormInput
                      type="text"
                      id="hdlName"
                      name="hdlName"
                      onChange={handleChange}
                      value={formData.hdlName}
                      // required
                    />
                  </FormRow>

                  <FormRow>
                    <FormLabel htmlFor="hdlName">중복 결과</FormLabel>
                    <FormInput
                      type="text"
                      id="hdlName"
                      name="hdlName"
                      onChange={handleChange}
                      value={formData.hdlName}
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

export default CheckSerialNumberDuplicationModal;
