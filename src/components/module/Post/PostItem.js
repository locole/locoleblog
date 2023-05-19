import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
  }
`;

const PostItem = ({CategoryColor, data}) => {
  const navigate = useNavigate();
  const date = new Date(data?.createdAt?.seconds*1000);
  const formDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostItemStyles onClick={() => {
      navigate(`/${data.slug}`)}} className="p-5 border-[2px] border-solid rounded-lg border-gray-300">
      <PostImage
        url={data.picture}
        alt=""
        to="/"
      ></PostImage>
      <PostCategory backgroundColor="#F3EDFF" color={CategoryColor}>{data.categoriesName}</PostCategory>
      <PostTitle color="black">
        {data.title}
      </PostTitle>
      <PostMeta color="#6B6B6B"></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;