import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import RegisterAuth from "../../components/auth/RegisterAuth";

const RegisterAuthForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const $inputs = Array.from(form.querySelectorAll("input"));

    const [inputCode] = $inputs.map(($input) => $input.value);
    console.log("code:", inputCode);

    if ([inputCode].includes("")) {
      console.log("에러 발생");
      setError("빈 칸을 모두 입력하세요.");
      return;
    } else {
      setError(null);
    }
  }, []);

  const reSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  let success = false;
  useEffect(() => {
    if (success === false) {
      setError("인증번호가 일치하지 않습니다.");
      return;
    } else {
      setError("");
      navigate("/registerFin");
    }
  }, [success, navigate]);

  return <RegisterAuth onSubmit={onSubmit} reSubmit={reSubmit} error={error} />;
};

export default RegisterAuthForm;
