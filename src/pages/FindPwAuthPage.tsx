import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import FindPwContainer from "../containers/auth/FindPwContainer";

const FindPwAuthPage = () => {
  return (
    <AuthTemplate>
      <FindPwContainer />
    </AuthTemplate>
  );
};

export default FindPwAuthPage;
