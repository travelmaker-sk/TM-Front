import React, { useState, useCallback } from "react";
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterContainer = () => {
  const [error, setError] = useState<string | null>(null);

  // 폼 등록 이벤트 핸들러
  const onRegister = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const $inputs = Array.from(form.querySelectorAll("input"));

    const [inputNickname, inputUsername, inputPw, inputPwConfirm] = $inputs.map(
      ($input) => $input.value
    );
    console.log("nickname:", inputNickname);
    console.log("username:", inputUsername);
    console.log("password:", inputPw);
    console.log("passwordConfirm:", inputPwConfirm);

    // TODO. API 호출
  }, []);

  return <RegisterForm onSubmit={onRegister} error={error} />;
};

export default RegisterContainer;
