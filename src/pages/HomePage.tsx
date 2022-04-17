import React from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import HeaderForm from "../containers/common/HeaderForm";

const Wrapeer = styled(Responsive)``;

const PostListPage = () => {
  return (
    <Wrapeer>
      <HeaderForm />
      <img src="./images/bg_1.png" alt="bg" />
      <img src="./images/bg_2.png" alt="bg" />
    </Wrapeer>
  );
};

export default PostListPage;
