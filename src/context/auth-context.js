import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { auth, db } from "../FireBase/FireBase-config";

const authContext = createContext();
function AuthProvider(props){ 
  const [userInfo, setUserInfo ] = useState({});
  const value = {userInfo, setUserInfo};
  useEffect(() => {
    onAuthStateChanged(auth, (user)=> {
      if(user){
        const colRef = collection(db, "users");
        const docRef = query(colRef, where("email", "==", user.email));
        onSnapshot(docRef, (snapshot) => {
          snapshot.forEach((doc) => {
            setUserInfo({...user, ...doc.data()})
          })
        })

      } else {
        setUserInfo(null);
      }
    })
  }, []);
  return <authContext.Provider value={value} {...props}></authContext.Provider>
}
function useAuth(){
    const context = useContext(authContext);
    if(context === "undefined") {
        throw  new Error("useAuth must be use in AuthProvider");
    }
    return context;
}
export {AuthProvider, useAuth}