import React, { Fragment } from "react";
import Footer from "../Footer/Footer";
import Header from "./Header";

const Layout = ({ children, userInfo }) => {
  return (
    <Fragment>
      <Header userInfo={userInfo}></Header>
      {children}
      <Footer></Footer>
    </Fragment>
  );
};

export default Layout;