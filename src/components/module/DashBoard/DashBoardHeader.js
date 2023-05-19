
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../Button";
const DashboardHeaderStyles = styled.div`
 
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
  
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    &-logo {
      width: 150px;
      height: 75px;
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

const DashBoardHeader = () => {
  const navigate = useNavigate();
  return (
    <DashboardHeaderStyles>
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
        </div>
      <div className="flex gap-5 ml-auto">
      <Button type="button" onclick={() => {
        navigate("./post");
      }} className="header-button" height="52px">
        Write new post
      </Button>
      <div className="header-avatar">
        <img
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
          alt=""
        />
      </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashBoardHeader;