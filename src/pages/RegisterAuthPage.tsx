import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import RegisterAuthForm from "../containers/auth/RegisterAuthForm";

const RegisterAuthPage = () => {
  return (
    <AuthTemplate>
      <RegisterAuthForm />
    </AuthTemplate>
  );
};

export default RegisterAuthPage;
