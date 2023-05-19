import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  background-color: ${props => props.backgroundColor};
  font-weight: 600;
  white-space: nowrap;
  a {
    color: ${props => props.color};;
    display: block;
    text-decoration: none;
  }
`;

const PostCategory = ({
  backgroundColor,
  color,
  children,
  type = "primary",
  className = "",
  to = "/",
}) => {
  return (
    <PostCategoryStyles backgroundColor={backgroundColor} color={color} type={type} className={`post-category ${className}`}>
      <NavLink to={to} >{children}</NavLink>
    </PostCategoryStyles>
  );
};
export default PostCategory;