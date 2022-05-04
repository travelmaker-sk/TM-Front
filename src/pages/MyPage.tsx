import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import MyPage from "../components/mypage/MyPage";
import HeaderForm from "../containers/common/HeaderForm";
import { MarginBottom, Wrapeer } from "./HomePage";

const MyPagePage = () => {
  const { user } = useSelector((state: RootStateOrAny) => state.user);

  return (
    <Wrapeer>
      <HeaderForm />
      <MarginBottom />
      <MyPage user={user} />
    </Wrapeer>
  );
};

export default MyPagePage;
