import styled from "styled-components";

// Styled components for layout
export const Container = styled.div`
  display: flex;
  height: 100vh; // Full viewport height
  align-items: center; /* Vertically center the children */
  justify-content: center; /* Horizontally center the children, if needed */
  /* border: 1px solid yellow; */
`;

export const ImageSection = styled.div`
  flex: 3; // 2/3 of the width
  background-color: var(--blue);
  background: url("ictk-bg.png") no-repeat center center;
  background-size: cover;
  /* border: 1px solid red; */
  height: 100vh;
  position: relative;
`;

export const OverlayText = styled.div`
  position: absolute;
  top: 50%; /* Center text vertically */
  left: 50%; /* Center text horizontally */
  transform: translate(
    -50%,
    -50%
  ); /* Adjust positioning to truly center the text */
  color: white; /* Text color */
  font-weight: bold;
  font-size: 6rem; /* Adjust text size as needed */
  text-align: center; /* Center align text */
  padding: 1rem; /* Optional: padding around text */
  background-color: rgba(0, 86, 255, 0.1);
`;

export const FormSection = styled.div`
  flex: 1; // 1/3 of the width
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  /* border: 1px solid #0056ff; */
`;

// Styled components for form elements
export const FormContainer = styled.div`
  width: 80%; // Width of the form container
  max-width: 400px;
  padding: 20px 20px;
  background: white;
  /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); */
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 15px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #0056ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
