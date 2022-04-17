import React, { useState, useCallback, useRef } from "react";
import LoginForm from "../../components/auth/LoginForm";

const LoginContainer = () => {
  const [error, setError] = useState<string | null>(null);

  const initialUid = useRef(localStorage.getItem("tm-saved-id") ?? "");

  // 폼 등록 이벤트 핸들러
  const onLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
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

  return <LoginForm onSubmit={onLogin} initialUid={initialUid} error={error} />;
};

export default LoginContainer;
