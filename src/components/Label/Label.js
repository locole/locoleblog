import React from 'react';
import styled from "styled-components"

const LabelStyles = styled.div`
        font-size: 20px;
        line-height: 30px;
        font-weight: 600;
`; 
const Label = ({htmlFor="", children}) => {
    return (
        <LabelStyles>
            <label htmlFor={htmlFor} >{children}</label>
        </LabelStyles>
    );
};

export default Label;