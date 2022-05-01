import React from "react";
import MyPage from "../components/mypage/MyPage";
import HeaderForm from "../containers/common/HeaderForm";
import { MarginBottom, Wrapeer } from "./HomePage";

const MyPagePage = () => {
  return (
    <Wrapeer>
      <HeaderForm />
      <MarginBottom />
      <MyPage
        user={{
          nickname: "닉네임예시",
          email: "email1234@google.com",
          password: "pw1234",
          postCount: 0,
          followers: 0,
          followings: 0,
        }}
      />
    </Wrapeer>
  );
};

export default MyPagePage;
