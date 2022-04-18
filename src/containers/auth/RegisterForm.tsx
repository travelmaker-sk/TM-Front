import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import Register from "../../components/auth/Register";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  // 폼 등록 이벤트 핸들러
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
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

  let success = false;
  useEffect(() => {
    if (success === false) {
      setError("?");
      return;
    } else {
      setError("");
      navigate("/registerAuth");
    }
  }, [success, navigate]);

  return <Register onSubmit={onSubmit} error={error} />;
};

export default RegisterForm;
