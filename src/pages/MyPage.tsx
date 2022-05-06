import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import styled from "styled-components";
import MyPage from "../components/mypage/MyPage";
import HeaderForm from "../containers/common/HeaderForm";
import { HeaderBottom, Wrapeer } from "./HomePage";

export const HeaderBottomPlus = styled.div`
  height: 40px;
`;

const MyPagePage = () => {
  const { user } = useSelector((state: RootStateOrAny) => state.user);

  return (
    <Wrapeer>
      <HeaderForm />
      <HeaderBottom />
      <HeaderBottomPlus />
      <MyPage user={user} />
    </Wrapeer>
  );
};

export default MyPagePage;
