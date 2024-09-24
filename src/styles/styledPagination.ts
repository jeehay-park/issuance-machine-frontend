import styled from "styled-components";

export const PaginationBox = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px 10px;
  gap: 10px;
  cursor: pointer;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    margin: 0 10px;
    font-size: 1.1rem;
    padding: 10px 10px;
    border-radius: 5px;
    border: 1px solid #d5d9e0;
    cursor: pointer;
  }

  li:hover {
    background-color: #768398;
    color: white;
  }
`;
