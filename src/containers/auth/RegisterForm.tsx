import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AuthForm from "../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  // useDispatch(): 액션을 발생시킨다.
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
