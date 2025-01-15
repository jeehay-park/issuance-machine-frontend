import React, { useState, ReactNode, useEffect, ChangeEvent } from "react";
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
import confetti from "canvas-confetti";
import success from "../../components/assets/green-tick.png";
import {
  FormContainer,
  FormRow,
  FormLabel,
  FormInput,
  FormSelect,
  FormError,
} from "../../styles/styledForm";
import { MdClose, MdCheck } from "react-icons/md";
import { programIdAtom, fetchProgramIdList } from "../../recoil/atoms/program";
import { snruleIdAtom, fetchSnruleIdList } from "../../recoil/atoms/snrule";
import { machineIdAtom, fetchMachineIdList } from "../../recoil/atoms/machine";
import { createWork } from "../../recoil/atoms/work";

// Define the shape of form data and error messages
interface FormData {
  workNo: string;
  tagName: string;
  customer: string;
  orderNo: string;
  deviceName: string;
  progId: string;
  mcnId: string;
  snrId: string;
  isLock: string;
  targetQnty: string;
  dueDate: string;
}

interface FormErrors {
  workNo: string;
  tagName: string;
  customer: string;
  orderNo: string;
  deviceName: string;
  progId: string;
  mcnId: string;
  snrId: string;
  isLock: string;
  targetQnty: string;
  dueDate: string;
}

// 작업 복제
const CopyWorkModal: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const defaultData = {
    workNo: "",
    tagName: "",
    customer: "",
    orderNo: "",
    deviceName: "",
    progId: "",
    mcnId: "",
    snrId: "",
    isLock: "",
    targetQnty: "",
    dueDate: "",
  };

  const selectedRow = useRecoilValue(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const setProgIds = useSetRecoilState(programIdAtom);
  const setSnruleIds = useSetRecoilState(snruleIdAtom);
  const setMachineIds = useSetRecoilState(machineIdAtom);

  const progIds = useRecoilValue(programIdAtom);
  const snrRuleIds = useRecoilValue(snruleIdAtom);
  const machineIds = useRecoilValue(machineIdAtom);

  const [progIdOptions, setProgIdOptions] = useState<string[]>([]);
  const [snrIdOptions, setSnrIdoptions] = useState<string[]>([]);
  const [machineIdOptions, setMachineIdoptions] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>(defaultData);
  const [errors, setErrors] = useState<FormErrors>(defaultData);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const openModal = () => {
    setFormData({
      workNo: "",
      tagName: selectedRow?.tag_name,
      customer: selectedRow?.customer,
      orderNo: selectedRow?.order_no,
      deviceName: selectedRow?.device_name,
      progId: selectedRow?.prog_id,
      mcnId: selectedRow?.mcn_id,
      snrId: selectedRow?.snr_id,
      isLock: selectedRow?.is_lock,
      targetQnty: selectedRow?.target_size,
      dueDate: selectedRow?.due_date,
    });
    setErrors(defaultData);
    setResponseMessage(null);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error for the current field
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = defaultData;
    let isValid = true;
    for (const key of Object.keys(tempErrors)) {
      if (formData[key as keyof typeof formData] === "") {
        tempErrors[key as keyof FormErrors] = `${key} is required`;
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("formData : ", formData);
    
    if (validate()) {
      try {
        
        const editedForm = {
          ...formData,
          isLock: formData?.isLock === "true" ? true : false,
          targetQnty: parseInt(formData.targetQnty),
        };

        console.log("editedForm :", editedForm)

        const result = await createWork(editedForm);

        if (result) {
          handleRefresh();
          setResponseMessage(result.header.rtnMessage);
        } else {
          setResponseMessage("Failed to create profile.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while duplicating the work.");
      }

      setFormData(defaultData);
      setErrors(defaultData);
      setIsSubmitted(false); // Reset submission state
    }
  };

  useEffect(() => {
    const fetchIds = async () => {
      const progIdsResponse = await fetchProgramIdList();

      if (progIdsResponse?.body) {
        setProgIds(progIdsResponse);
      }

      const snrIdsResponse = await fetchSnruleIdList();
      if (snrIdsResponse?.body) {
        setSnruleIds(snrIdsResponse);
      }

      const machineIdsResponse = await fetchMachineIdList();
      if (machineIdsResponse?.body) {
        setMachineIds(machineIdsResponse);
      }
    };

    if (isModalOpen) {
      fetchIds();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (progIds) {
      setProgIdOptions(progIds?.body?.programInfoIdList || []);
    }

    if (snrRuleIds) {
      setSnrIdoptions(snrRuleIds?.body?.snruleIdList || []);
    }

    if (machineIds) {
      setMachineIdoptions(machineIds?.body?.machineIdList || []);
    }
  }, [progIds, snrRuleIds, machineIds]);

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="600px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>발급 작업 복제</h3>
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
                    <FormLabel htmlFor="workNo">작업 표시 번호</FormLabel>
                    <FormInput
                      type="text"
                      id="workNo"
                      name="workNo"
                      value={formData.workNo}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  {isSubmitted && errors?.workNo && (
                    <FormError>{errors?.workNo}</FormError>
                  )}{" "}
                  {/* Render error if exists */}
                  <FormRow>
                    <FormLabel htmlFor="tagName">태그 이름</FormLabel>
                    <FormInput
                      type="text"
                      id="tagName"
                      name="tagName"
                      value={formData.tagName}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
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
                    <FormLabel htmlFor="orderNo">발주번호</FormLabel>
                    <FormInput
                      type="text"
                      id="orderNo"
                      name="orderNo"
                      value={formData.orderNo}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="deviceName">디바이스 이름</FormLabel>
                    <FormInput
                      type="text"
                      id="deviceName"
                      name="deviceName"
                      value={formData.deviceName}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="progId">프로그램</FormLabel>
                    <FormSelect
                      id="progId"
                      name="progId"
                      onChange={handleChange}
                      value={selectedRow?.prog_id || formData?.progId}
                    >
                      <option value={""}>- 선택 -</option>
                      {progIdOptions?.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="mcnId">장비</FormLabel>
                    <FormSelect
                      id="mcnId"
                      name="mcnId"
                      onChange={handleChange}
                      value={selectedRow?.mcn_id || formData?.mcnId}
                    >
                      <option value={""}>- 선택 -</option>
                      {machineIdOptions?.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="snrId">SN 규칙</FormLabel>
                    <FormSelect
                      id="snrId"
                      name="snrId"
                      onChange={handleChange}
                      value={selectedRow?.snr_id || formData?.snrId}
                    >
                      <option value={""}>- 선택 -</option>
                      {snrIdOptions?.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="isLock">발급칩 LOCK</FormLabel>
                    <FormSelect
                      id="isLock"
                      name="isLock"
                      value={selectedRow?.is_lock.toString() || formData.isLock}
                      onChange={handleChange}
                    >
                      <option value={""}>- 선택 -</option>
                      <option value="true">TRUE</option>
                      <option value="false">FALSE</option>
                    </FormSelect>
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="targetQnty">목표 수량</FormLabel>
                    <FormInput
                      type="text"
                      id="targetQnty"
                      name="targetQnty"
                      value={formData.targetQnty}
                      onChange={handleChange}
                      // required
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel htmlFor="dueDate">완료 예정일시</FormLabel>
                    <FormInput
                      type="text"
                      id="dueDate"
                      name="dueDate"
                      value={formData.dueDate}
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

export default CopyWorkModal;
