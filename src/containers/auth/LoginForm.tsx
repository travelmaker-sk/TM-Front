import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import Login from "../../components/auth/Login";
import { login } from "../../lib/api/auth";

const LoginForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const initialUid = useRef(localStorage.getItem("tm-saved-id") ?? "");

  // 폼 등록 이벤트 핸들러
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const $inputs = Array.from(form.querySelectorAll("input"));

      const [inputEmail, inputPw, checkSaveId, checkKeepLogin] = $inputs.map(
        ($input) => ($input.type === "checkbox" ? $input.checked : $input.value)
      );
      console.log("email:", inputEmail);
      console.log("password:", inputPw);
      console.log("save:", checkSaveId);
      console.log("login:", checkKeepLogin);

      if ([inputEmail, inputPw].includes("")) {
        console.log("에러 발생");
        setError("빈 칸을 모두 입력하세요.");
        return;
      } else {
        setError(null);
      }

      // API 호출
      login({
        email: inputEmail as string,
        password: inputPw as string,
      }).then((token) => {
        if (!token) {
          setError("아이디나 비밀번호가 일치하지 않습니다.");
          return;
        } else {
          setError("");
          navigate("/");
        }

        if (checkSaveId)
          localStorage.setItem("tm-saved-id", inputEmail as string);
        if (checkKeepLogin) localStorage.setItem("tm-token", token as string);
      });
    },
    [navigate]
  );

  return <Login onSubmit={onSubmit} initialUid={initialUid} error={error} />;
};

export default LoginForm;
