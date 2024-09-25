import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  /* border-radius: 8px; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  width: 120px; /* Set a fixed width for labels */
  margin-right: 10px;
  font-weight: bold;
  color: #333;
`;

export const FormInput = styled.input`
  flex: 1; /* Allow input to take remaining space */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
`;

export const FormButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const FormError = styled.div`
  color: red;
  margin-top: -15px;
  margin-bottom: 15px;
  font-size: 12px;
`;