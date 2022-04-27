import React from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import HeaderForm from "../containers/common/HeaderForm";

const Wrapeer = styled(Responsive)``;

const MarginBottom = styled.div`
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
    height: 50px;
  }
`;

const PostListPage = () => {
  return (
    <Wrapeer>
      <HeaderForm />
      <MarginBottom />
      <img src="./images/bg_1.png" alt="bg" />
      <img src="./images/bg_2.png" alt="bg" />
    </Wrapeer>
  );
};

export default PostListPage;
