import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import FindPwFinForm from "../containers/auth/FindPwAuthForm";

const FindPwCompletePage = () => {
  return (
    <AuthTemplate>
      <FindPwFinForm />
    </AuthTemplate>
  );
};

export default FindPwCompletePage;
