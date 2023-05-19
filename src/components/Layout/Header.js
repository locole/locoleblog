import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/auth-context";
import { Button } from "../Button";
const HeaderStyles = styled.header`
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    margin: 20px 0;
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
    &-logo {
      width: 130px;
      height: 65px;
      img {
        width: 100%;
        height: 100%;
       
      }
    }
    &-list {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 30px;
    }
    &-item {
      font-size: 18px;
      font-weight: 600;
      line-height: 27px;
    }
    &-left {
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 60px;
    }
    &-search {
      width: 300px;
      font-size: 18px;
      font-family: "Poppins", sans-serif;
      font-weight: 600;
      input {
        width: 100%;
        padding: 20px;
        outline: none;
        border-radius: 10px;
        border: 2px solid #eee;
        font-size: 16px;
        line-height: 24px;
        color: #999999;
        &:focus {
          border: 2px solid ${(props) => props.theme.primary};
        }
        &::placeholder {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
  }
`;
const headerTab = [
  {
    id: 1,
    title: "Home",
  },
  {
    id: 2,
    title: "DashBoard",
  },
  {
    id: 3,
    title: "Contact",
  },
];
const Header = ({userInfo}) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const handleClickLogOut = () => {
        signOut(auth).then(() => {
          console.log("Sign out successfully");
        })
        .catch((error) => {
          console.log(error);
        })
  }
  return (
    <HeaderStyles>
      <div className="header">
        <a href="/" className="header-logo">
          <img src="https://palap.vn/wp-content/uploads/2021/08/logo-dark.png" alt="monkey-blog" />
        </a>
        <ul className="header-list">
          {headerTab.map((item) => (
            <NavLink to={`/${item.title}`} className="header-item" key={item.id}>
              {item.title}
            </NavLink>
          ))}
        </ul>
        <div className="header-left">
          <div className="header-search">
            <input type="text" placeholder="Search post..." />
          </div>
          {
            userInfo ? <Button type="button" onclick={handleClickLogOut}>Log out</Button> : <Button type="button" onclick={() => {
              navigate("./sign-up");
            }}>Sign up</Button>
          }
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
