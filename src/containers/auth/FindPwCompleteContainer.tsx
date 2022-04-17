import React from "react";
import FindPwComplete from "../../components/auth/FindPwComplete";

const FindPwCompleteContainer = () => {
  const reSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <FindPwComplete reSubmit={reSubmit} />;
};

export default FindPwCompleteContainer;
