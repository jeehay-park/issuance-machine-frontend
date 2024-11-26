import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 100%;
  margin: 20px auto;
  padding: 20px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const FormLabel = styled.label<{ width?: string }>`
  width: ${({ width }) =>
    width ? width : "120px"}; /* Set a fixed width for labels */
  margin-right: 10px;
  font-weight: bold;
  color: #333;
`;

export const FormInput = styled.input`
  flex: 1; /* Allow input to take remaining space */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;

  &[type="text"] {
    &:focus {
      /* border-color: #4caf50; */
      border-color: var(--paleGrey);
      outline: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
  }
`;

export const FormTextArea = styled.textarea`
  flex: 1; /* Allow input to take remaining space */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;

  &:focus {
    /* border-color: #4caf50; */
    border-color: var(--paleGrey);
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;

export const RadioInput = styled.input`
  /* Hide the native radio button */
  display: none;
`;

export const RadioLabel = styled.label`
  position: relative;
  padding-left: 25px; /* Space for custom radio button */
  cursor: pointer;
  display: flex; /* Use flexbox to align items */
  align-items: center; /* Center the label text with the radio */

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border: 1px solid #ccc; /* Default border color */
    border-radius: 50%; /* Circle shape */
    background: white; /* Background for unselected state */
  }

  /* Show the custom radio button's clicked color */
  ${RadioInput}:checked + &::before {
    /* background-color: var(--blue);  */
    border: 2px solid var(--blue);
  }
`;

export const FormSelect = styled.select`
  flex: 1; /* Take the remaining space similar to input */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  background-color: white;
  color: #333;

  /* Styling for arrow */
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns="http://www.w3.org/2000/svg" width="292.362" height="292.362"%3E%3Cpath fill="%23333" d="M287 69.841L146.181 210.661 5.362 69.841 0 75.203l146.181 146.18L292.362 75.203z"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;

  &:focus {
    border-color: var(--paleGrey);
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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
