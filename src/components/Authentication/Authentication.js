import React from "react";
import styled from "styled-components";
const flexCenter = `
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const AuthenticationStyles = styled.div`
  .auth {
    width: 100%;
    ${flexCenter}
    row-gap: 20px;
    margin-bottom: 40px;
    &-img {
      width: 121px;
      height: 156px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-title {
      color: ${(props) => props.theme.primary};
      font-size: 40px;
      font-weight: 600;
    }
  }
`;
const Authentication = () => {
  return (
    <AuthenticationStyles>
      <div className="auth">
        <div className="auth-img">
          <img srcSet="/monkey.png 2x" alt="monkey-blog" />
        </div>
        <h2 className="auth-title"> Monkey Blogging</h2>
      </div>
    </AuthenticationStyles>
  );
};

export default Authentication;
