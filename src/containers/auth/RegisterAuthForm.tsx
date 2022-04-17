import React, { useState } from "react";
import RegisterAuth from "../../components/auth/RegisterAuth";

const RegisterAuthForm = () => {
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const reSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <RegisterAuth onSubmit={onSubmit} reSubmit={reSubmit} error={error} />;
};

export default RegisterAuthForm;
