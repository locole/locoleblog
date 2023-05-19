import { getAuth, signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";

const ButtonStyles = styled.button`
  min-width: 200px;
  height: 66px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  /* background-image: linear-gradient(to right bottom , 
    ${(props) => props.theme.primary}, ${(props) => props.theme.secondary}) ; */
  background-color: ${(props) => props.theme.primary};
  border-radius: 12px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
`;
const Button = ({ children, type, onclick = () => {} }) => {
  return (
    <ButtonStyles type={type} onClick={onclick}>
      {children}
    </ButtonStyles>
  );
};

export default Button;
