import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
    @media screen and (max-width: 1023.98px) {
      &-image {
        height: 250px;
      }
    }
  }
`;

const PostNewestLarge = ({data}) => {
  const navigate = useNavigate();
  const date = new Date(data?.createdAt?.seconds*1000);
  const formDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewestLargeStyles onClick={() => {
      navigate(`/${data.slug}`)
    }}>
      <PostImage
        url={data.picture}
        alt=""
      ></PostImage>

      <PostCategory backgroundColor="#F3EDFF" color="#6B6B6B">{data.categoriesName}</PostCategory>
      <PostTitle color="black" size="big">
        {data.title}
      </PostTitle>
      <PostMeta authorName={data.author} date={formDate} color="#6B6B6B"></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;