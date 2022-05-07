import React, { useEffect, useState } from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import HeaderForm from "../containers/common/HeaderForm";
import SearchBar from "../components/mainpage/SearchBar";
import { myInfo } from "../api/auth";
import { RootStateOrAny, useSelector } from "react-redux";

export const Wrapper = styled(Responsive)`
  .post-list {
    font-size: 20px;
    // Mobile
    @media screen and (max-width: 767px) {
      font-size: 18px;
    }
  }
`;

const PostListPage = () => {
  return (
    <Wrapper>
      <HeaderForm />
      <SearchBar />
      <div className="post-list">다른 사람들의 여행을 둘러보세요</div>
    </Wrapper>
  );
};

export default PostListPage;
