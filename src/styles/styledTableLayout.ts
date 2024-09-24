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

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  color: #555;
  margin-bottom: 1rem;
`;

export const TitleContainer = styled.div`
  text-align: left;
  padding: 1rem;
`;


