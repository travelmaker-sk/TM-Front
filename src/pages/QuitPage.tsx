import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import Quit from "../components/mypage/Quit";

const QuitPage = () => {
  return (
    <AuthTemplate>
      <Quit
        user={{
          nickname: "닉네임예시",
          email: "email1234@google.com",
          password: "pw1234",
        }}
      />
    </AuthTemplate>
  );
};

export default QuitPage;
