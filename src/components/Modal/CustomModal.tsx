import React, { useState, ReactNode } from "react";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalHeaderTitle,
  ModalPadding,
  ModalContent,
} from "../../styles/styledModal";

// CustomModal Component
const CustomModal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer> 
          <ModalPadding>
            <ModalHeader>
              <ModalHeaderTitle>
                <h2 style={{ color: "white" }}>작업 추가</h2>
              </ModalHeaderTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
          </ModalPadding>
          <ModalContent>
          <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <br />
              <label>
                Email:
                <input type="email" name="email" />
              </label>
              <br />
              <button type="submit">Add User</button>
            </form>
         
          </ModalContent>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

export default CustomModal;
