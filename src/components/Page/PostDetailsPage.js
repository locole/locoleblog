
import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../FireBase/FireBase-config";
import Heading from "../Layout/Heading";
import Layout from "../Layout/Layout";
import PostCategory from "../module/Post/PostCategory";
import PostImage from "../module/Post/PostImage";
import PostItem from "../module/Post/PostItem";
import PostMeta from "../module/Post/PostMeta";
import ErrorPage from "./ErrorPage";
const PostDetailsPageStyles = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
  padding-bottom: 100px;

  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: 700;
      font-size: 36px;
      margin: 16px 0;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 800px;
      margin: 80px auto;
    }
  }
  .author {
    background: #F8F9FA;
    margin-top: 40px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
     width: 200px;
     height: 200px;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
      
    }
    &-name {
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
   .entry-content {
    h2{
        font-size: 20px;
        font-weight: bold;
        margin: 40px 0;
    }
    img{
        width: 100%;
        object-fit: cover;
        margin: 40px 0 10px;
        border-radius: 30px;
        cursor: pointer;  
    }
    figcaption{
        width: 100%;
        text-align: center;
        font-size: 13px;
        font-weight: 400;
        color: ${props => props.theme.grayDark};
        margin: 10px auto;
    }
    p{
        text-align: justify;
    }
   }
   .grid-layout{
    display: flex;
    flex-direction: row;
    gap: 40px;
   }
`;

const PostDetailsPage = () => {
  const {slug} = useParams();
  const [postInfo, setPostInfo] = useState({})
  const [author , setAuthor ] = useState({});

  const [status, setStatus] = useState(true);
   useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
     
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostInfo({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
      
    }
    fetchData();
   }, [ slug]);
   
   useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
   console.log(status)
   useEffect(() => {
    async function fetchAuthorData() {
       if(!postInfo.authorUID) return
      const authorRef = query(collection(db, "users"), where("userUID", "==", postInfo.authorUID));
      onSnapshot(authorRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setAuthor({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
      
    }
    fetchAuthorData();
   },[postInfo.authorUID]);
   const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("hot", "==", true),
      limit(4)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  useEffect(() => {
    document.title=postInfo.title;
  })
  if (posts.length <= 0) return null;
  if (!postInfo.authorUID) return <ErrorPage></ErrorPage>;
  
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfo.picture}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory backgroundColor="#F3EDFF" color="#6B6B6B" className="mb-6">{postInfo.categoriesName}</PostCategory>
              <h1 className="post-heading">
                {postInfo.title}
              </h1>
              <PostMeta></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content"
            dangerouslySetInnerHTML={{
                __html: postInfo.content || "",
              }}>
            </div>
            <div className="author">
              <div className="author-image">
                <img
                  src={author.avatar}
                  alt=""
                />
              </div>
              <div className="author-content">
                <h3 className="author-name">{author.fullname}</h3>
                <p className="author-desc">
                 {author.description}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid grid-cols-4 gap-7">
              {
                posts.length > 0 && posts.map((item) => (
              <PostItem CategoryColor="white" data={item} key={item.id}>
                
              </PostItem>
            ))
              }
            </div>
          </div> */}
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;