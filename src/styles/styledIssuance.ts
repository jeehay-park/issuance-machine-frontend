import styled, { keyframes, css } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  /* border: 1px solid #ddd; */
  border-top: none;
  /* background-color: #fafafa; */
`;

// Styled components
export const TabMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-bottom: 1px solid #ddd;
  /* gap: 5px; */
`;

export const TabItem = styled.div<{ active: boolean }>`
  position: relative;
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#003b9e" : "#f1f1f1")};
  color: ${({ active }) => (active ? "white" : "#777")};
  border: 1px solid #ddd;
  border-bottom: none;
  margin-right: 5px;
  /* border-radius: 8px 8px 0 0; */
  font-weight: bold;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  /* 
  &:hover {
    background-color: #E5F3FA;
    color: white;
  } */
`;

export const CloseIcon = styled.button`
  margin-left: 10px;
  cursor: pointer;
  color: white;
  border: none;
  background-color: var(--red);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const Content = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-top: none;
  /* background-color: #fafafa; */
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

// Styled components for the search and filter options
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
  color: #777;
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 12px 20px;
  border: none;
  background-color: #768398;
  color: white;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #003b9e;
  }

  &:disabled {
    background-color: #d5d9e0;
  }
`;

export const HandlerButton = styled.div<{
  color?: string;
  flex?: string;
  disabled?: boolean;
}>`
  flex: ${({ flex }) => (flex ? flex : "0.1")};
  border: ${({ color }) => `1px solid ${color ? color : "#0288D1"}`};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: normal;
  color: ${({ color }) => (color ? color : "#0288D1")};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: ${({ color }) => (color ? color : "#0288D1")};
    color: white;
  }

  &:disabled {
    background-color: #d5d9e0;
  }
`;

// Define animations
const pulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(40, 167, 69, 0.7); }
  50% { box-shadow: 0 0 20px rgba(40, 167, 69, 0.9); }
  100% { box-shadow: 0 0 10px rgba(40, 167, 69, 0.7); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-1px); }
`;

const blink = keyframes`
  50% { opacity: 0.5; }
`;

const fade = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.8; }
  100% { opacity: 1; }
`;

const grow = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Define dynamic styles based on status
const getAnimation = (status: string) => {
  switch (status) {
    case "RUNNING":
      return css`
        animation: ${pulse} 1.5s infinite alternate;
      `;
    case "ON_STOP":
      return css`
        animation: ${blink} 1s infinite;
      `;
    case "READY":
      return css`
        animation: ${fade} 2s infinite;
      `;
    case "INIT":
      return css`
        animation: ${grow} 1.2s infinite;
      `;
    default:
      return "";
  }
};

// Styled component
export const WorkStatusButton = styled.div<{ status: string }>`
  border: 1px solid ${({ status }) => getColor(status)};
  border-radius: 0.5rem;
  color: ${({ status }) => getColor(status)};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 15rem;
  text-align: center;
  line-height: 2rem;
  ${({ status }) => getAnimation(status)}
`;

// Function to set colors based on status
const getColor = (status: string) => {
  switch (status) {
    case "RUNNING":
      return "#28A745"; // Green
    case "ON_STOP":
      return "#FFC107"; // Yellow
    case "READY":
      return "#007BFF"; // Blue
    case "INIT":
      return "#17A2B8"; // Teal
    case "FINISHED":
      return "#6C757D"; // Gray
    default:
      return "#0288D1"; // Default
  }
};
