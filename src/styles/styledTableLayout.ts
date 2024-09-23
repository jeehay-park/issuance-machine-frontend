import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px;
  /* border: 1px solid #ddd; */
  border-top: none;
  /* background-color: #fafafa; */
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

export const SubTitle = styled.div`
  padding: 20px;
`;
