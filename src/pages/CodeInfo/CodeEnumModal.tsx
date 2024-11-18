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
import { createCode } from "../../recoil/atoms/code";
import { dynamicObject } from "../../utils/types";
import { createCodeEnum } from "../../recoil/atoms/code";
import { FormColumn } from "../../styles/styledForm";
import { FaMinus, FaPlus } from "react-icons/fa";

// Define the shape of form data and error messages
interface EnumData {
  enumValue: string;
  isMandatory: boolean;
  order: number;
  ip: string;
  description: string;
}

interface FormErrors {
  enumValue: string;
}

interface WarningType {
  enumValue: string | null;
  isMandatory: boolean | null;
  ip: string | null;
  description: string | null;
}

// 코드 정보 추가
const CodeEnumModal: React.FC<{
  children: ReactNode;
  row: dynamicObject;
}> = ({ children, row }) => {
  const initialEnumData: EnumData = {
    enumValue: "",
    isMandatory: true,
    order: 0,
    ip: "",
    description: "",
  };

  const selectedRow = useRecoilValue(selectedRowAtom);
  const setSelectedRow = useSetRecoilState(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const [warning, setWarning] = useState<WarningType>({
    enumValue: null,
    isMandatory: null,
    ip: null,
    description: null,
  });

  const [enumList, setEnumList] = useState<EnumData[]>([initialEnumData]);
  const [errors, setErrors] = useState<FormErrors>({ enumValue: "" });

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
    setEnumList([initialEnumData]); // Reset to initial state
    setErrors({ enumValue: "" });
    setWarning({
      enumValue: null,
      isMandatory: null,
      ip: null,
      description: null,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setEnumList([initialEnumData]); // Reset to initial state
    setErrors({ enumValue: "" });
    setFormHeight(0); // Reset the height when closing the modal
    setWarning({
      enumValue: null,
      isMandatory: null,
      ip: null,
      description: null,
    });
    setSelectedRow(null);
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;

    let updatedEnumList = [...enumList];
    
    if(name === "isMandatory") {
        updatedEnumList[index] = {
            ...updatedEnumList[index],
            isMandatory: e.target.checked,
          };
    } else {
        updatedEnumList[index] = {
            ...updatedEnumList[index],
            [name]: value,
          };
    }
  

    setEnumList(updatedEnumList);

    setWarning((prev) => ({
      ...prev,
      enumValue: null,
    }));
  };

//   Validate form inputs
    // const validate = (): boolean => {
    //   let tempErrors: FormErrors = { enumValue: "" };
    //   let isValid = true;

    //   enumList.forEach((enum, index) => {
    //     if (!enum.enumValue) {
    //       tempErrors.enumValue = `ENUM ${index + 1}: EnumValue is required`;
    //       isValid = false;
    //     }
    //   });

    //   setErrors(tempErrors);
    //   return isValid;
    // };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent form default behavior, just in case

    const updatedEnumList = enumList.map((item, index) => ({
      ...item,
      order: index,
    }));

console.log("handleSubmit clicked!")
    console.log(updatedEnumList);


    try {
        const result = await createCodeEnum({
          codeId: row.code_id,
          enumList: updatedEnumList,
        });
        if (result) {
        //   handleRefresh();
          setResponseMessage(result.header.rtnMessage);
        } else {
          setResponseMessage("Failed to create machine.");
        }
      } catch (error) {
        setResponseMessage("An error occurred while creating the machine.");
      }
  };

  // Add a new device input field
  const addEnumInput = () => {
    setEnumList((prevEnumList) => [...prevEnumList, initialEnumData]);
  };

  // Add a new device input field
  const deleteEnumInput = (selectedIndex: number) => {
    if (enumList.length <= 1) {
      setEnumList([initialEnumData]); // Reset to initial state
    } else {
      const temp = enumList?.filter((item, index) => index !== selectedIndex);
      setEnumList(temp);
    }
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="700px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>코드 ENUM</h3>
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
                    <FormLabel>코드 이름</FormLabel>
                    <FormLabel style={{ textAlign: "left" }}>
                      {row.code_name}
                    </FormLabel>
                  </FormRow>

                  <FormRow>
                    <FormLabel>코드 상태</FormLabel>
                    <FormLabel style={{ textAlign: "left" }}>
                      {row.status}
                    </FormLabel>
                  </FormRow>

                  <hr style={{ margin: "1rem auto", color: "var(--blue)" }} />
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      width: "100%",
                    }}
                  >
                    <FormColumn
                      style={{
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      <FormLabel>ENUM</FormLabel>
                    </FormColumn>

                    <FormColumn
                      style={{
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      <FormLabel>설명</FormLabel>
                    </FormColumn>

                    <FormColumn
                      style={{
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      <FormLabel>IP</FormLabel>
                    </FormColumn>

                    <FormColumn
                      style={{
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      <FormLabel>필수</FormLabel>
                    </FormColumn>

                    <FormColumn
                      style={{
                        width: "5%",
                        textAlign: "center",
                      }}
                    >
                      <FaMinus
                        size={30}
                        color="white"
                        style={{ fontWeight: "bolder", visibility: "hidden" }}
                      />
                    </FormColumn>
                  </div>

                  {enumList.map((enumItem, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        padding: "10px 0",
                        gap: "20px",
                        width: "100%",
                      }}
                    >
                      <FormColumn style={{ width: "20%" }}>
                        <FormInput
                          style={{ width: "100%" }}
                          type="text"
                          id={`enumValue-${index}`}
                          name="enumValue"
                          onChange={(e) => handleChange(e, index)}
                          value={enumItem.enumValue}
                        />
                        {errors.enumValue && (
                          <p style={{ color: "red" }}>{errors.enumValue}</p>
                        )}
                      </FormColumn>

                      <FormColumn style={{ width: "20%", marginBottom: "5px" }}>
                        <FormInput
                          style={{ width: "100%" }}
                          type="text"
                          id={`description-${index}`}
                          name="description"
                          onChange={(e) => handleChange(e, index)}
                          value={enumItem.description}
                        />
                      </FormColumn>
                      <FormColumn style={{ width: "20%" }}>
                        <FormInput
                          style={{ width: "100%" }}
                          type="text"
                          id={`ip-${index}`}
                          name="ip"
                          onChange={(e) => handleChange(e, index)}
                          value={enumItem.ip}
                        />
                      </FormColumn>
                      <FormColumn style={{ width: "20%" }}>
                        <FormInput
                          //  style={{width : "100%"}}
                          type="checkbox"
                          id={`isMandatory-${index}`}
                          name="isMandatory"
                          onChange={(e) => handleChange(e, index)}
                          checked={enumItem.isMandatory}
                          //   value={enumItem.isMandatory}
                        />
                      </FormColumn>
                      <FormColumn
                        style={{
                          width: "5%",
                          cursor: "pointer",
                          textAlign: "center", // Centers the delete icon
                        }}
                        onClick={() => deleteEnumInput(index)}
                      >
                        <FaMinus
                          size={30}
                          color="var(--red)"
                          style={{ fontWeight: "bolder" }}
                        />
                      </FormColumn>
                    </div>
                  ))}
                </form>

                <FormColumn
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={addEnumInput}
                >
                  <FaPlus
                    size={30}
                    color="var(--blue)"
                    style={{ fontWeight: "bolder" }}
                  />
                </FormColumn>
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

export default CodeEnumModal;
