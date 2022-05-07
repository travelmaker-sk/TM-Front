import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import FindPwForm from "../containers/auth/findPwForm";

const FindPwPage = () => {
  return (
    <AuthTemplate>
      <FindPwForm />
    </AuthTemplate>
  );
};

export default FindPwPage;
