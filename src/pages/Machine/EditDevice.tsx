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
  FormColumn,
  FormLabel,
  FormInput,
} from "../../styles/styledForm";
import { MdClose, MdCheck } from "react-icons/md";
import { updateDevice } from "../../recoil/atoms/device";

// Define the shape of form data and error messages
interface DeviceData {
  dvcId: null;
  dvcName: string;
  dvcNum: number;
  ip: string;
  romVer: string;
}

interface FormErrors {
  dvcName: string;
}

interface WarningType {
  dvcNameWarning: string | null;
  ipWarning: string | null;
  romVerWarning: string | null;
}

// 디바이스 편집
const EditDevice: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
  mcnId: string;
}> = ({ children, handleRefresh, mcnId }) => {
  const selectedRow = useRecoilValue(selectedRowAtom);
  const initialDeviceData: DeviceData = {
    dvcId: null,
    dvcName: selectedRow?.dvcName,
    dvcNum: 1,
    ip: selectedRow?.ip,
    romVer: selectedRow?.romVer,
  };

  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const [warning, setWarning] = useState<WarningType>({
    dvcNameWarning: null,
    ipWarning: null,
    romVerWarning: null,
  });

  const [devices, setDevices] = useState<DeviceData>(initialDeviceData);
  const [errors, setErrors] = useState<FormErrors>({ dvcName: "" });

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
    setDevices(initialDeviceData); // Reset to initial state
    setErrors({ dvcName: "" });
    setWarning({
      dvcNameWarning: null,
      ipWarning: null,
      romVerWarning: null,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setDevices(initialDeviceData); // Reset to initial state
    setErrors({ dvcName: "" });
    setFormHeight(0); // Reset the height when closing the modal
    setWarning({
      dvcNameWarning: null,
      ipWarning: null,
      romVerWarning: null,
    });
    setSelectedRow(null);
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDevices((prev) => ({
      ...prev,
      [name]: value,
    }));

    setWarning((prev) => ({
      ...prev,
      mcnNameWarning: null,
    }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = { dvcName: "" };
    let isValid = true;

    if (!devices?.dvcName) {
      tempErrors.dvcName = `Device : dvcName is required`;
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (validate()) {
      try {
        const result = await updateDevice({
          mcnId: mcnId,
          deviceList: [devices],
        });

        if (result) {
          handleRefresh();
          setResponseMessage(result.header.rtnMessage);
        } else {
          setResponseMessage("Failed to create machine.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while creating the machine.");
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
                <h3 style={{ color: "white" }}>디바이스 변경</h3>
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <FormColumn style={{ flex: 1, textAlign: "center" }}>
                      <FormLabel>이름</FormLabel>
                    </FormColumn>
                    <FormColumn style={{ flex: 1, textAlign: "center" }}>
                      <FormLabel style={{ textAlign: "center" }}>IP</FormLabel>
                    </FormColumn>
                    <FormColumn style={{ flex: 1, textAlign: "center" }}>
                      <FormLabel style={{ textAlign: "center" }}>
                        롬(ROM) 버전
                      </FormLabel>
                    </FormColumn>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <FormColumn style={{ width: "100%" }}>
                      <FormInput
                        type="text"
                        id="dvcName"
                        name="dvcName"
                        onChange={handleChange}
                        value={devices?.dvcName}
                      />
                      {errors.dvcName && (
                        <p style={{ color: "red" }}>{errors.dvcName}</p>
                      )}
                    </FormColumn>
                    <FormColumn style={{ width: "100%" }}>
                      <FormInput
                        type="text"
                        id="ip"
                        name="ip"
                        onChange={handleChange}
                        value={devices?.ip}
                      />
                    </FormColumn>
                    <FormColumn style={{ width: "100%" }}>
                      <FormInput
                        type="text"
                        id="romVer"
                        name="romVer"
                        onChange={handleChange}
                        value={devices?.romVer}
                      />
                    </FormColumn>
                  </div>
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

export default EditDevice;
