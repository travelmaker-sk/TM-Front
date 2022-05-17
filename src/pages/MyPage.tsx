import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import styled from "styled-components";
import MyPage from "../components/mypage/MyPage";
import { Wrapper } from "./HomePage";
import Header from "../components/common/Header";

export const HeaderBottomPlus = styled.div`
  height: 50px;
`;

const MyPagePage = () => {
  const { user } = useSelector((state: RootStateOrAny) => state.user);

  return (
    <Wrapper>
      <Header />
      <HeaderBottomPlus />
      <MyPage user={user} />
    </Wrapper>
  );
};

export default MyPagePage;
