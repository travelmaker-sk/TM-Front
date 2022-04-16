import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import PrivacyContainer from "../containers/auth/PrivacyContainer";

const PrivacyPage = () => {
  return (
    <AuthTemplate>
      <PrivacyContainer />
    </AuthTemplate>
  );
};

export default PrivacyPage;
