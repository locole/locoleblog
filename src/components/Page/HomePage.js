import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/auth-context';

import Layout from '../Layout/Layout';
import HomeBanner from '../module/Home/HomeBanner';
import HomeFeature from '../module/Home/HomeFeature';
import HomeNewest from '../module/Home/HomeNewest';
const HomePageStyles= styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 20px;
/* Smartphones (portrait and landscape) ----------- */
/* Smartphones (portrait and landscape) ----------- */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 2) {
/* Styles */
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
.banner-image{
    display: none;
}
.jRGaRx{
    height: 500px;
}
}

/* Desktops and laptops ----------- */
@media only screen 
and (min-width : 1224px) {
/* Styles */
}
`;
const HomePage = () => {
    const {userInfo} = useAuth();
    useEffect(() => {
        document.title ="Home Page";
        console.log(userInfo);
    }, [userInfo])
  
    return (
        <HomePageStyles className='homepage'>
           <Layout userInfo={userInfo}>
            <HomeBanner></HomeBanner>
            <HomeFeature></HomeFeature>
            <HomeNewest CategoryColor="#6B6B6B"></HomeNewest>
           </Layout>
        </HomePageStyles>
    );
};

export default HomePage;