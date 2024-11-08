import styled from "styled-components";

// Styled components
export const Container = styled.div<{ isExpanded: boolean }>`
  display: grid;
  grid-template-areas: "sidebar header" // the first row will have two columns, both occupied by the "header" area
    "sidebar main"; // the second row will have two columns: one for the "sidebar" and one for the "main" content area
  grid-template-rows: 10px auto;
  grid-template-columns: ${({ isExpanded }) => (isExpanded ? "250px" : "80px")} 1fr;
  /* height: 100vh; */
  height: auto; /* Let the container grow based on content */
  /* transition: grid-template-columns 0.5s ease;  */
  min-height: 0;

  @media (max-width: 1024px) {
   width: auto;
   height: auto ;
   orientation: landscape;
   
  }
`;

export const Header = styled.header`
  grid-area: header;
  /* background-color: var(--layoutBlue);
  color: white; */
  /* padding: 1rem; */
  padding-right: 10px;
  text-align: center;
  /* border: 1px solid purple; */
  position: relative;
`;

export const Dropdown = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 100%; /* Position it below the header */
  right: 10px;
  /* background-color: var(--layoutBlue); */
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  width: 200px; /* Example width */
  border: "1px solid red";
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--layoutBlue);
    color: white;
  }
`;

export const Sidebar = styled.aside<{ isExpanded: boolean }>`
  grid-area: sidebar;
  /* background: var(--layoutBlue); */
  /* background: linear-gradient(135deg, #002b7f, #0056ff); */
  /* background: linear-gradient(135deg, #003366, #0066cc); */
  background: linear-gradient(
    150deg,
    #0056ff,
    #002b7f,
    #003366,
    #0066cc,
    #0072ff
  );
  color: white;
  display: flex;
  flex-direction: column;
  align-items: ${({ isExpanded }) => (isExpanded ? "flex-start" : "center")};
  gap: 2rem;
  transition: all 0.3s ease;
  height: 100vh;

  @media (max-width: 1024px) {
   width: auto;
   height: auto ;
  }
`;

export const MainContent = styled.main`
  grid-area: main;
`;

export const ToggleButton = styled.button`
  margin-left: 10px;
  border-radius: 50%; /* Makes the button perfectly round */
  border: none;
  padding: 0.5rem;
  width: 30px; /* Fixed width for round shape */
  height: 30px; /* Fixed height for round shape */
  font-size: 20px;
  font-weight: bolder;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for 3D effect */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const MenuBox = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  cursor: pointer;
  :hover {
    background-color: #15355a;
  }
`;
