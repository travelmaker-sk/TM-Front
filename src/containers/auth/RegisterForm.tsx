import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AuthForm
      type="register"
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
