import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { date } from "yup";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";


const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 272px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: #6E33F1;
;
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
  }
`;
const PostFeatureItem = ({data}) => {
  const navigate = useNavigate();
  const date = new Date(data?.createdAt?.seconds*1000);
  const formDate = new Date(date).toLocaleDateString("vi-VI");
  // console.log(formDate);
  return (
    <PostFeatureItemStyles onClick={() => {
      navigate(`/${data.slug}`)
    }}>
      <PostImage
        url={data.picture}
        alt="unsplash"
      ></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory backgroundColor="white" color="#6B6B6B">{data.categoriesName}</PostCategory>
          <PostMeta authorName={data.author} date={formDate} color="white"></PostMeta>
        </div>
        <PostTitle color="white" size="big">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;