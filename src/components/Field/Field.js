import React from 'react';
import styled from 'styled-components';

const FieldStyles = styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 20px;
      
 `;
const Field = ({children}) => {
    return (
        <FieldStyles>
        {children}
        </FieldStyles>
    );
};

export default Field;