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

    if ([inputNickname, inputUsername, inputPw, inputPwConfirm].includes("")) {
      console.log("에러 발생");
      setError("빈 칸을 모두 입력하세요.");
      return;
    } else if (inputPw !== inputPwConfirm) {
      console.log("에러 발생");
      setError("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setError(null);
    }

    // TODO. API 호출
  }, []);

  return <RegisterForm onSubmit={onRegister} error={error} />;
};

export default RegisterContainer;
