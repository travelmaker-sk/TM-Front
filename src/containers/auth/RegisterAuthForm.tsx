import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import RegisterAuth from "../../components/auth/RegisterAuth";
import { registerAuth } from "../../lib/api/auth";
import { useLocation } from "react-router-dom";

const RegisterAuthForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const email = location.state;
  console.log(email);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const $inputs = Array.from(form.querySelectorAll("input"));

      const [inputAuthCode] = $inputs.map(($input) => $input.value);
      console.log("AuthCode:", inputAuthCode);

      if ([inputAuthCode].includes("")) {
        console.log("에러 발생");
        setError("빈 칸을 모두 입력하세요.");
        return;
      } else {
        setError(null);
      }
      // API 호출
      registerAuth(email as string, inputAuthCode as string).then(
        (registerAuthResult) => {
          if (!registerAuthResult) {
            setError("인증번호가 일치하지 않습니다.");
            return;
          } else {
            setError("");
            navigate("/register-fin");
          }
        }
      );
    },
    [navigate]
  );

  const reSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return <RegisterAuth onSubmit={onSubmit} reSubmit={reSubmit} error={error} />;
};

export default RegisterAuthForm;
