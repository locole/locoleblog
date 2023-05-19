import React from "react";
import styled from "styled-components";
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
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Palap Blog</h1>
            <p className="banner-desc">
              Welcome to my blog! I'm excited to share my thoughts and insights
              on a variety of topics, from technology and science to lifestyle
              and travel. As an avid learner and curious individual, I'm always
              seeking new information and perspectives to expand my knowledge
              and understanding of the world. Through this blog, I hope to
              inspire and inform others while also exploring my own interests
              and passions. So, grab a cup of coffee and join me on this journey
              of discovery!
            </p>
            <Button to="/sign-up" kind="secondary" className="banner-button">
              Get started
            </Button>
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
