import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import SetProfileForm from "../containers/mypage/SetProfileForm";

const SetProfilePage = () => {
  return (
    <AuthTemplate>
      <SetProfileForm
        user={{
          nickname: "닉네임예시",
          email: "email1234@google.com",
          password: "pw1234",
        }}
      />
    </AuthTemplate>
  );
};

export default SetProfilePage;
