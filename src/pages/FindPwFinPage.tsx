import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import FindPwFinForm from "../containers/auth/FindPwFinForm";

const FindPwCompletePage = () => {
  return (
    <AuthTemplate>
      <FindPwFinForm />
    </AuthTemplate>
  );
};

export default FindPwCompletePage;
