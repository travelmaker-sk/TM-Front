import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import SetProfileForm from "../containers/mypage/SetProfileForm";

const SetProfilePage = () => {
  return (
    <AuthTemplate>
      <SetProfileForm />
    </AuthTemplate>
  );
};

export default SetProfilePage;
