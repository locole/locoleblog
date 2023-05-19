
import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../../FireBase/FireBase-config";
import Heading from "../../Layout/Heading";
import PostFeatureItem from "../Post/PostFeatureItem";
const HomeFeatureStyles = styled.div`
.grid-layout{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
}
margin-bottom: 50px;

`;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("hot", "==", true),
      limit(3)
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
  console.log(posts);
  return (
    <HomeFeatureStyles className="home-block">
     <div className="container">
        <Heading>Featured posts</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;