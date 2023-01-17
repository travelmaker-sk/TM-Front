import { useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Logo from "../common/Logo";

interface AuthTemplateType {
  children: any;
}

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
  justify-content: center;
  &.childScrollable {
    justify-content: flex-start;
  }
  align-items: space-between;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
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

const AuthTemplate = ({ children }: AuthTemplateType) => {
  const [childScrollable, setChildScrollable] = useState(false);

  return (
    <>
      <AuthTemplateBlock>
        <Logo />
        <WhiteBox
          onLoad={(e) => {
            const whiteBox = e.currentTarget;
            const child = whiteBox.children[0];

            const whiteBoxPadding = window.getComputedStyle(whiteBox).padding;
            const whiteBoxPaddingVertical = Number(
              whiteBoxPadding.split(" ")[0].split("px")[0]
            );

            if (
              whiteBox.clientHeight - whiteBoxPaddingVertical * 2 <
              child.clientHeight
            )
              setChildScrollable(true);
          }}
          className={childScrollable ? "childScrollable" : ""}
        >
          {children}
        </WhiteBox>
      </AuthTemplateBlock>
    </>
  );
};

export default AuthTemplate;
