import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashBoardHeader from "./DashBoardHeader";
import Sidebar from "./SideBar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  padding-right: 30px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
    }
  }
`;
const DashBoardLayout = ({ children }) => {
  return (
    <DashboardStyles>
      <DashBoardHeader></DashBoardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
          {children}
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashBoardLayout;