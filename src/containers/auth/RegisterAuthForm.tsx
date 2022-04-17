import React, { useState } from "react";
import RegisterAuth from "../../components/auth/RegisterAuth";

const RegisterAuthForm = () => {
  const [error, setError] = useState<string | null>(null);

  const onRegisterAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const reRegisterAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <RegisterAuth
      onSubmit={onRegisterAuth}
      reSubmit={reRegisterAuth}
      error={error}
    />
  );
};

export default RegisterAuthForm;
