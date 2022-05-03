import React from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import HeaderForm from "../containers/common/HeaderForm";

export const Wrapeer = styled(Responsive)``;

export const MarginBottom = styled.div`
  // Desktop
  @media screen and (min-width: 1280px) {
    height: 130px;
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    height: 130px;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    height: 100px;
  }
`;

const PostListPage = () => {
  return (
    <Wrapeer>
      <HeaderForm />
      <MarginBottom />
      <img src="./images/bg1.png" alt="bg" />
      <img src="./images/bg2.png" alt="bg" />
    </Wrapeer>
  );
};

export default PostListPage;
