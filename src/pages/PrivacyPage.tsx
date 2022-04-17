import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import PrivacyForm from "../containers/auth/PrivacyForm";

const PrivacyPage = () => {
  return (
    <AuthTemplate>
      <PrivacyForm />
    </AuthTemplate>
  );
};

export default PrivacyPage;
