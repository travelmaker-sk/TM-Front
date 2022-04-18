import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Logo from "../common/Logo";

type AuthTemplateProps = {
  children: any;
};

const AuthTemplateBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${palette.gray[2]};
  // Mobile - Login
  // @media screen and (max-width: 767px) {
  //   height: 120%;
  // }
`;

const WhiteBox = styled.div`
  height: 70%;
  width: 65%;
  padding: 0 18%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);

  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    width: 70%;
    padding: 0 10%;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    height: 75%;
    width: 85%;
    padding: 0 7%;
    h2 {
      font-size: 20px !important;
    }
  }
  // Mobile - Login
  // @media screen and (max-width: 767px) {
  //   height: 95%;
  // }
`;

const Spacer = styled.div`
  height: 10%;
`;

const AuthTemplate = ({ children }: AuthTemplateProps) => {
  return (
    <>
      <AuthTemplateBlock>
        <Logo />
        <WhiteBox>{children}</WhiteBox>
        <Spacer />
      </AuthTemplateBlock>
    </>
  );
};

export default AuthTemplate;
