import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const {setCategoryName,setShow} = useDropdown();
  const handleClickOption = () => {
   onClick && onClick();
  setCategoryName(props.children);
   setShow(false);
    
  }
  return (
    <div
      className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-100"
      onClick={handleClickOption}
    >
      {props.children}
    </div>
  );
};

export default Option;