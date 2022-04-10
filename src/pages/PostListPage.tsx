import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import styled from "styled-components";
import MainNavContainer from "../containers/Navigation/MainNavContainer";

const PostListPage = () => {
  return (
    <div>
      <MainNavContainer />
      <HeaderContainer />
      <div>POST LIST</div>
    </div>
  );
};

export default PostListPage;
