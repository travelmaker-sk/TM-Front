import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import styled from "styled-components";
import MyPage from "../components/mypage/MyPage";
import { Wrapper } from "./HomePage";
import Header from "../components/common/Header";

export const HeaderBottomPlus = styled.div`
  height: 80px;
`;

const MyPagePage = () => {
  return (
    <Wrapper>
      <Header />
      <HeaderBottomPlus />
      <MyPage />
    </Wrapper>
  );
};

export default MyPagePage;
