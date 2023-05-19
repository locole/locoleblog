import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 8px;
    }
    &-content {
      flex: 1;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
  }
`;
const PostNewestItem = ({data}) => {
  const navigate = useNavigate();
  const date = new Date(data?.createdAt?.seconds*1000);
  const formDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewestItemStyles onClick={() => {
      navigate(`/${data.slug}`)
    }}>
      <PostImage
        url={data.picture}
        alt=""
        to="/"
      ></PostImage>

      <div className="post-content">
        <PostCategory backgroundColor="white" color="#9D9D9D" type="secondary">{data.categoriesName}</PostCategory>
        <PostTitle color="black">
          {data.title}
        </PostTitle>
        <PostMeta authorName={data.author} date={formDate} color="#6B6B6B"></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;