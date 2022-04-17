import React from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import HeaderContainer from "../containers/common/HeaderContainer";

const Wrapeer = styled(Responsive)``;

const PostListPage = () => {
  return (
    <Wrapeer>
      <HeaderContainer />
      <img src="./images/bg_1.png" alt="bg" />
      <img src="./images/bg_2.png" alt="bg" />
    </Wrapeer>
  );
};

export default PostListPage;
