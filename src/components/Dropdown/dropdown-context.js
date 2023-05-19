const { useContext } = require("react");
const { useState } = require("react");
const { createContext } = require("react");

const DropdownContext = createContext();
function DropdownProvider(props) {
    const [show, setShow] = useState(false);
    const [categoryName , setCategoryName ] = useState("Choose your category");
  const handleToggleDropdown = () => {
    setShow(!show);
    console.log(show);
  };
   const values = {categoryName, setCategoryName , show , setShow, handleToggleDropdown};
return <DropdownContext.Provider value={values}>{props.children}</DropdownContext.Provider>
}
function useDropdown() {
    const context = useContext(DropdownContext);
    if(typeof context === "undefined"){
        throw new Error("useDropdown must be used within DropdownProvider");
    }
    return context;
}
export { useDropdown, DropdownProvider}