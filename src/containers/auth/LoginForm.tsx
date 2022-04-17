import React, { useState, useCallback, useRef, useEffect } from "react";
import Login from "../../components/auth/Login";

const LoginForm = () => {
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

    // TODO. API 호출

    if (checkSaveId)
      localStorage.setItem("tm-saved-id", inputUsername as string);
    if (checkKeepLogin) localStorage.setItem("tm-token", "some_token");
  }, []);

  let success = true;
  useEffect(() => {
    if (success === false) {
      setError("아이디나 비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setError("");
    }
  }, [success]);

  return <Login onSubmit={onSubmit} initialUid={initialUid} error={error} />;
};

export default LoginForm;
