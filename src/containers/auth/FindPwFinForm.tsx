import React from "react";
import FindPwFin from "../../components/auth/FindPwFin";

const FindPwFinForm = () => {
  const reSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <FindPwFin reSubmit={reSubmit} />;
};

export default FindPwFinForm;
