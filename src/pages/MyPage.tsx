import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import styled from "styled-components";
import MyPage from "../components/mypage/MyPage";
import { Wrapper } from "./HomePage";
import Header from "../components/common/Header";
import ScrollToTopButton from "../components/common/scrollToTopButton";
import Footer from "../components/common/Footer";

export const HeaderBottomPlus = styled.div`
  height: 80px;
`;

const MyPagePage = () => {
  return (
    <Wrapper>
      <Header />
      <HeaderBottomPlus />
      <MyPage />
      <Footer />
      <ScrollToTopButton />
    </Wrapper>
  );
};

export default MyPagePage;
