import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/auth-context';

import Layout from '../Layout/Layout';
import HomeBanner from '../module/Home/HomeBanner';
import HomeFeature from '../module/Home/HomeFeature';
import HomeNewest from '../module/Home/HomeNewest';
const HomePageStyles= styled.div`
width: 1200px;
margin: 0 auto;
`;
const HomePage = () => {
    useEffect(() => {
        document.title ="Home Page";
    })
    const {userInfo} = useAuth();
    return (
        <HomePageStyles>
           <Layout userInfo={userInfo}>
            <HomeBanner></HomeBanner>
            <HomeFeature></HomeFeature>
            <HomeNewest CategoryColor="#6B6B6B"></HomeNewest>
           </Layout>
        </HomePageStyles>
    );
};

export default HomePage;