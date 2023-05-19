import React from 'react';
import { useController } from 'react-hook-form';
import styled from 'styled-components';
const InputStyles = styled.div`
width: 100%;
position: relative;
  input{
           width: 100%;
            padding: ${props => props.hasIcon ? "20px 60px 20px 20px" : "20px"};
            border-radius: 8px;
            outline: none;
            border: 2px solid #9999;
            font-size: 18px;
            font-weight: 500;
            font-family: "Poppins", sans-serif;
           &:focus{
            border: 2px solid ${props => props.theme.primary};
           }  
           &::placeholder{
            color: #9999;
            font-weight: 6   00;
           }  
        }
        .icon-eye{
         position: absolute;
         top: 50%;
         right: 20px;
         transform: translateY(-50%);
        }
`
const Input = ({type, name, hasIcon, control, children , ...props}) => {
   const {field} = useController({
      control,
      name,
      defaultValue:"",
      
   });
    return (
       <InputStyles hasIcon={children ? true : false}>
        <input autoComplete='off' type={type} id={name} {...field} {...props} />
        {children}
       </InputStyles>
    );
};

export default Input;