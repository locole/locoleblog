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
        <a href="/home"  className="w-[260px] h-[140px]">
          <img src="https://palap.vn/wp-content/uploads/2021/08/logo-dark.png" className="w-full h-full" alt="monkey-blog" />
        </a>
        <h2 className="auth-title">Palap Blog</h2>
        
      </div>
    </AuthenticationStyles>
  );
};

export default Authentication;
