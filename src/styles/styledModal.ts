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
  /* border : 1px solid green; */
`;

export const ModalContainer = styled.div<{ width: string; height: string }>`
  position: relative;
  background-color: white;
  /* padding: 20px; */
  border-radius: 8px;
  width: ${({ width }) => (width ? width : "400px")};
  height: ${({ height }) => (height ? height : "400px")};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  /* border: 1px solid red; */
`;

export const ModalHeader = styled.div`
  background-color: var(--paleGrey);
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

export const ModalHeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
  }
`;

export const ModalPadding = styled.div`
  background-color: var(--paleGrey);
  height: 40px;
  line-height: 40px;
`;

export const ModalContent = styled.div`
  display: flex;
  padding: 20px auto;
  justify-content: center;
  align-items: center;
  height: calc(100% - 40px);
  border: 1px solid green;
`;
