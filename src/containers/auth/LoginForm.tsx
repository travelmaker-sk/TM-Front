import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../../components/auth/Login";

const LoginForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const initialUid = useRef(localStorage.getItem("tm-saved-id") ?? "");

  // 폼 등록 이벤트 핸들러
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const $inputs = Array.from(form.querySelectorAll("input"));

    const [inputUsername, inputPw, checkSaveId, checkKeepLogin] = $inputs.map(
      ($input) => ($input.type === "checkbox" ? $input.checked : $input.value)
    );
    console.log("username:", inputUsername);
    console.log("password:", inputPw);
    console.log("save:", checkSaveId);
    console.log("login:", checkKeepLogin);

    if ([inputUsername, inputPw].includes("")) {
      console.log("에러 발생");
      setError("빈 칸을 모두 입력하세요.");
      return;
    } else {
      setError(null);
    }

    // TODO. API 호출

    if (checkSaveId)
      localStorage.setItem("tm-saved-id", inputUsername as string);
    if (checkKeepLogin) localStorage.setItem("tm-token", "some_token");
  }, []);

  let success = false;
  useEffect(() => {
    if (success === false) {
      setError("아이디나 비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setError("");
      navigate("/");
    }
  }, [success, navigate]);

  return <Login onSubmit={onSubmit} initialUid={initialUid} error={error} />;
};

export default LoginForm;
