import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Label from '../Label/Label';
const ToogleStyles = styled.label`
 
`
const Toogle = ({onchange=()=> {},toogle,children, rest}) => {
    return (
        <ToogleStyles>
            <input onChange={onchange} type="checkbox" className='hidden-input'  />
            <div className='w-[100px] h-[50px] rounded-full bg-green-400 relative  mt-[20px]'>
                <div  className= {`w-[50px] h-[50px] rounded-full bg-white absolute transition-all translate-x-[2px] ${toogle ? "toogle" : ""}`} ></div>
            </div>
        </ToogleStyles>
    );
};

export default Toogle;