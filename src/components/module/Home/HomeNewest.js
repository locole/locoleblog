

import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../../FireBase/FireBase-config";
import Heading from "../../Layout/Heading";
import PostItem from "../Post/PostItem";
import PostNewestItem from "../Post/PostNewestItem";
import PostNewestLarge from "../Post/PostNewestLarge";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 40px;
    align-items: start;
  }
  .grid-layout{
    display: flex;
    gap: 40px;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
      
    }
    
  }
  /* Smartphones (portrait and landscape) ----------- */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 2) {
/* Styles */
.footer{
  display: grid;
  grid-template-columns: 2;
}
}

/* Smartphones (landscape) ----------- */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: landscape) {
/* Styles */
}

/* Smartphones (portrait) ----------- */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) {
/* Styles */
}

/* iPads (portrait and landscape) ----------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) {
/* Styles */
}

/* iPads (landscape) ----------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape) {
/* Styles */
}

/* iPads (portrait) ----------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait) {
/* Styles */
}

/* Desktops and laptops ----------- */
@media only screen 
and (min-width : 1224px) {
/* Styles */
}
`;

const HomeNewest = ({
  CategoryColor
}) => {
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
  if (posts.length <= 0) return null;
 const newPosts = posts.slice(1);
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge data={posts[0]}></PostNewestLarge>
          <div className="sidebar">
            {
              newPosts.length > 0 && newPosts.map((post) => (
                <PostNewestItem data={post} key={post.id}></PostNewestItem>
              ))
            }
          </div>
        </div>
        <div className="grid grid-cols-4 gap-10 footer">
          {
            posts.length > 0 && posts.map((item) => (
              <PostItem CategoryColor={CategoryColor} data={item} key={item.id}>
                
              </PostItem>
            ))
          }  
       
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;