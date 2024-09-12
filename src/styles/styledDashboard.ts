import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title"
    "issuance"
    "table";
  grid-template-rows: 0.1fr 1fr 8fr;
  grid-template-columns: 1fr;
  height: calc(100vh - 50px);
  /* overflow: "hidden"; */
`;

export const Round = styled.div<{ color: string; size: string }>`
  width: ${({ size }) => (size ? size : "100px")};
  height: ${({ size }) => (size ? size : "100px")};
  background: ${({ color }) => (color ? color : "black")};
  border-radius: 50%; /* Makes the div round */
  border: 20px solid ${({ color }) => (color ? color : "black")}; /* Sets the border thickness and color */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.2;
  padding: 20px 20px;
  color: white;
  font-weight: bolder;
  font-size: 30px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3),
    /* Shadow for depth */ -4px -4px 10px rgba(255, 255, 255, 0.6); /* Highlight for depth */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4); /* Shadow for text */
`;

export const InfoContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 30px 70px;
  background-color: #fcfcfc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px; /* Adjust this to your layout */
  width: auto;
  margin: 1rem;
`;

export const InfoItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  font-weight: 500;
  gap: 10px;

  & > span {
    color: #333;
  }

  & > strong {
    color: #0056ff; /* Change color for highlighted text */
  }
`;

export const JobInfoContainer = styled.div`
  /* border: 1px solid #ddd; */
  border-radius: 10px;
  padding: 20px;
  background-color: #fcfcfc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 1rem;
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  text-align: center;
  /* border: 1px solid purple; */
`;

export const Header = styled.div`
  font-weight: bold;
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  position: sticky;
  top: 0px;
  z-index: 1;
`;

export const RowContainer = styled.div`
  height: 300px; /* Set a height for the container */
  /* overflow-y: auto;  */
`;

export const Row = styled.div`
  padding: 10px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
`;

export const Status = styled.span<{ status: string }>`
  color: ${({ status }) => (status === "발급중" ? "green" : "red")};
`;

export const Button = styled.button`
  background-color: #768398;
  color: white;
  border: none;
  /* border-radius: 25px; */
  padding: 10px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-right: 5px;

  &:hover {
    background-color: #003b9e;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
  &:active {
    background-color: #01579b;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0;
  align-items: baseline;
  gap: 5px;
`;

export const Tab = styled.button<{ active: boolean }>`
  background-color: inherit;
  color: ${({ active }) => (active ? "#092B9C" : "#bbb")};
  border: 2px ${({ active }) => (active ? "solid #092B9C" : "dotted #bbb")};
  border-radius: 20px;
  padding: 5px 20px;
  /* margin: 0 10px; */
  font-size: 0.9rem;
  font-weight: ${({ active }) => (active ? "bold" : "undefined")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    /* background-color:#777; */
    color: #092b9c;
    border: 2px solid #092b9c;
  }

  &:focus {
    outline: none;
  }
`;
