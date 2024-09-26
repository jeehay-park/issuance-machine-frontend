import styled from "styled-components";

export const ModalBackground = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const ModalContainer = styled.div<{ width?: string }>`
  position: relative;
  background-color: white;
  border-radius: 8px;
  width: ${({ width }) => (width ? width : "400px")};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "var(--paleGrey)"};
  /* height: 40px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ModalFooter = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "white"};
  /* height: 40px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  border-top: 1px solid #ccc;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalFooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  /* border: 1px solid purple; */
  /* 
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 0.5px;
    background-color: grey;
    left: 50%;
    transform: translateX(-50%);
  } */
`;

export const CloseButton = styled.button`
  color: white;
  background: none;
  border: none;
  padding: 5px 5px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: var(--red); /* Apply background color on hover */
    border-radius: 35%; /* This makes the element a circle */
    /* display: flex;
    align-items: center;
    justify-content: center; */
  }
`;

export const ModalPadding = styled.div`
  /* background-color: var(--paleGrey); */
  /* height: 40px; */
  line-height: 40px;
  border-radius: 8px;
`;

export const ModalContent = styled.div`
  display: flex;
  padding: 20px auto;
  justify-content: center;
  align-items: flex-start;
  max-height: 85vh;
  overflow-y: auto;
`;
