import React, { Fragment } from 'react';
import { useDropdown } from './dropdown-context';

const List = ({children}) => {
    const {show} = useDropdown();
    return (
        <>
           {
            show && 
                <div className='absolute left-0 w-full bg-white shadow-md list '>
                {children}
            </div>
            
           }
        </>
    );
};

export default List;
// list danh sach dropdown 