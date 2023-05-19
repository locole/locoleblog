import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../context/auth-context";
import { Button } from "../../Button";

const HomeBannerStyles = styled.div`
  width: 100%;
  min-height: 520px;
  padding: 40px;
  border-radius: 20px;
  /* background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  ); */
  background-color: ${props => props.theme.primary};
  margin-bottom: 60px;
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
  /* Smartphones (portrait and landscape) ----------- */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 2) {
    display: none;
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
}

/* Desktops and laptops ----------- */
@media only screen 
and (min-width : 1224px) {
/* Styles */
}
`;

const HomeBanner = () => {
  const navigate = useNavigate();
  const {userInfo} = useAuth();
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Palap Blog</h1>
            <p className="p-10 banner-desc">
              Welcome to my blog! I'm excited to share my thoughts and insights
              on a variety of topics, from technology and science to lifestyle
              and travel. As an avid learner and curious individual, I'm always
              seeking new information and perspectives to expand my knowledge
              and understanding of the world. Through this blog, I hope to
              inspire and inform others while also exploring my own interests
              and passions. So, grab a cup of coffee and join me on this journey
              of discovery!
            </p>
           {
            !userInfo ?  <button className="p-5 rounded-lg bg-[#F4A852] ml-20" onClick={() => {
              navigate("/sign-up");
            }}>Get started</button> : ""
           }
          </div>
          <div className="banner-image">
            <img
              className="rounded-xl"
              src="https://palap.vn/wp-content/uploads/2023/02/best-gaming-laptop-20220926-medium.jpg"
              alt="banner"
            />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};
export default HomeBanner;
