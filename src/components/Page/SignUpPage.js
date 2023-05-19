import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../Button";
import { Field } from "../Field";
import { IconEyeOpen, IconEyeClose } from "../Icon";
import Input from "../Input/Input";
import Label from "../Label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "../Spinner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase/FireBase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import { Authentication } from "../Authentication";
import { useAuth } from "../../context/auth-context";
import { async } from "@firebase/util";

const flexCenter = `
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const SignUpPageStyles = styled.div`
  width: 500px;
  margin: 20px auto;
  .form {
    width: 100%;
    ${flexCenter};
    row-gap: 20px;
  }
  .navigation {
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.primary};
    margin-top: 10px;
  }
`;
const schema = yup.object({
  fullname: yup.string().required("Please enter your FullName"),
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 character"),
});
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  
  const navigate = useNavigate();
  const [togglePassword, setTooglePassword] = useState(true);
  
  const handleSignUp = async (values) => {
    
    if (!isValid) return;
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
    
      const colRef = collection(db, "users");
      values = {
        ...values, 
        uid: user.uid
      }
     await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      userUID: user.uid,
      imageName:""
    });
    toast.success("Register sucessfully !!!");
    const q = query(colRef, where("userUID", "==", values.uid));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     navigate(`/update-user?id=${doc.id}`);
     
    });
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Register failed !!!")
      // ..
    });
    
    
    
    
  };

  useEffect(() => {
    console.log(Object.values(errors));
    const errorList = Object.values(errors);
    if (errorList.length > 0) {
      toast.error(errorList[0].message);
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Register Page";
  }, []);
  return (
    <SignUpPageStyles>
      <Authentication></Authentication>
      <form
        action=""
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname" children="Fullname"></Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname..."
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email" children="Email"></Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email..."
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password" children="Password"></Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password..."
            control={control}
          >
            {togglePassword ? (
              <IconEyeOpen
                classname="icon-eye"
                onclick={() => {
                  setTooglePassword(false);
                }}
              ></IconEyeOpen>
            ) : (
              <IconEyeClose
                className="icon-eye"
                onclick={() => {
                  setTooglePassword(true);
                }}
              ></IconEyeClose>
            )}
          </Input>
        </Field>
        <NavLink to="/sign-in" className="navigation">
          Did you have account? Sign in!!!
        </NavLink>
        <Button type="submit" isSubmitting={isSubmitting}
         >Sign Up</Button>
      </form>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
