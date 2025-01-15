import styled from 'styled-components';

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
  background-color: ${({ active }) => (active ? '#003b9e' : '#f1f1f1')};
  color: ${({ active }) => (active ? 'white' : '#777')};
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

  td, th {
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
    background-color:#d5d9e0;
  }
  
`;