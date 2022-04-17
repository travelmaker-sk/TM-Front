import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import FindPwForm from "../containers/auth/FindPwForm";

const FindPwAuthPage = () => {
  return (
    <AuthTemplate>
      <FindPwForm />
    </AuthTemplate>
  );
};

export default FindPwAuthPage;
