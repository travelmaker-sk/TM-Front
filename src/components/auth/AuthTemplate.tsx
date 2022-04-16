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
`;

const AuthLogo = styled(Logo)``;

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
`;

const Spacer = styled.div`
  height: 10%;
`;

const AuthTemplate = ({ children }: AuthTemplateProps) => {
  return (
    <>
      <AuthTemplateBlock>
        <AuthLogo />
        <WhiteBox>{children}</WhiteBox>
        <Spacer />
      </AuthTemplateBlock>
    </>
  );
};

export default AuthTemplate;
