import React from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import HeaderForm from "../containers/common/HeaderForm";

export const Wrapeer = styled(Responsive)``;
export const Wrapeer2 = styled.div``;

export const HeaderBottom = styled.div`
  // Desktop
  @media screen and (min-width: 1280px) {
    height: 80px;
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    height: 80px;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    height: 65px;
  }
`;

const PostListPage = () => {
  return (
    <Wrapeer2>
      <HeaderForm />
      <HeaderBottom />
      <img src="./images/bg1.png" alt="bg" />
    </Wrapeer2>
  );
};

export default PostListPage;
