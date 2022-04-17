import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import RegisterAuthContainer from "../containers/auth/RegisterAuthContainer";

const RegisterAuthPage = () => {
  return (
    <AuthTemplate>
      <RegisterAuthContainer />
    </AuthTemplate>
  );
};

export default RegisterAuthPage;
