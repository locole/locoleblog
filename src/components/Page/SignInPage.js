import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Field } from "../Field";
import Input from "../Input/Input";
import Label from "../Label/Label";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../Button";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase/FireBase-config";
import { toast } from "react-toastify";
import { IconEyeClose, IconEyeOpen } from "../Icon";
import { Authentication } from "../Authentication";
const SignInPageStyles = styled.div`
  width: 500px;
  margin: 20px auto;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  email: yup
    .string()
    .email("Invalid email !!!")
    .required("Please enter your email !!!"),
  password: yup
    .string()
    .required("Please enter your password !!")
    .min(8, "Password must be at least 8 character"),
});

const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const err = Object.values(errors);
    if (err.length > 0) {
      toast.error(err[0].message);
    }
  }, [errors]);
  useEffect(() => {
    document.title = "SignIn Page";
  }, []);
  const [togglePassword, setTooglePassword] = useState(true);
  const navigate = useNavigate();
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Sign In success !!!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(user);
      })
      .catch((errors) => {
        toast.error("Email or password is invalid!!!");
        return;
      });
  };
  return (
    <SignInPageStyles>
      <Authentication></Authentication>
      <form action="" autoComplete="off" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            control={control}
            type="email"
            name="email"
            placeholder="Enter your email"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            control={control}
            type={togglePassword ? "password" : "text"}
            name="password"
            placeholder="Enter your password"
          >
            {togglePassword ? (
              <IconEyeClose
                className="icon-eye"
                onclick={() => {
                  setTooglePassword(false);
                }}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                classname="icon-eye"
                onclick={() => {
                  setTooglePassword(true);
                }}
              ></IconEyeOpen>
            )}
          </Input>
        </Field>
        <NavLink to="/sign-up" className="navigation">
          Do you have account?Create an account!!!
        </NavLink>
        <Button type="submit">Sign In</Button>
      </form>
    </SignInPageStyles>
  );
};

export default SignInPage;
