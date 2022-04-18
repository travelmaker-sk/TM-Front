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
  justify-content: flex-start;
  align-items: center;
  background: ${palette.gray[2]};
`;

const WhiteBox = styled.div`
  height: 70%;
  width: 65%;
  padding: 52px 15%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  overflow: auto;

  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    width: 70%;
    padding: 52px 10%;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    height: 75%;
    width: 85%;
    padding: 52px 7%;
    h2 {
      font-size: 20px !important;
    }
  }
`;

const AuthTemplate = ({ children }: AuthTemplateProps) => {
  return (
    <>
      <AuthTemplateBlock>
        <Logo />
        <WhiteBox>{children}</WhiteBox>
      </AuthTemplateBlock>
    </>
  );
};

export default AuthTemplate;
