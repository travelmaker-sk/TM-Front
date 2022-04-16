import React, { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";

const LoginFormContainer = () => {
  const [error, setError] = useState<string | null>(null);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <LoginForm onChange={onChange} onSubmit={onSubmit} error={error} />;
};

export default LoginFormContainer;
