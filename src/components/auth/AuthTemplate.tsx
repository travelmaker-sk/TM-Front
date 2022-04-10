import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Logo from "../common/Logo";

// 회원가입 / 로그인 페이지 레이아웃

// 화면 전체
const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthLogo = styled(Logo)`
  .logo {
    color: ${palette.gray[4]};
  }
`;

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  height: 600px;
  padding: 2rem;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 2px;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const AuthTemplate = ({ children }) => {
  return (
    <>
      <AuthTemplateBlock>
        <AuthLogo />
        <Spacer />
        <WhiteBox>{children}</WhiteBox>
      </AuthTemplateBlock>
    </>
  );
};

export default AuthTemplate;
