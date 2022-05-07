import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import styled from "styled-components";
import MyPage from "../components/mypage/MyPage";
import HeaderForm from "../containers/common/HeaderForm";
import { Wrapper } from "./HomePage";

export const HeaderBottomPlus = styled.div`
  height: 50px;
`;

const MyPagePage = () => {
  const { user } = useSelector((state: RootStateOrAny) => state.user);

  return (
    <Wrapper>
      <HeaderForm />
      <HeaderBottomPlus />
      <MyPage user={user} />
    </Wrapper>
  );
};

export default MyPagePage;
