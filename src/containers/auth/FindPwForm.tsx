import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FindPw from "../../components/auth/FindPw";

const FindPwForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const $inputs = Array.from(form.querySelectorAll("input"));

    const [inputUsername] = $inputs.map(($input) => $input.value);
    console.log("username:", inputUsername);

    if ([inputUsername].includes("")) {
      console.log("에러 발생");
      setError("빈 칸을 모두 입력하세요.");
      return;
    } else {
      setError(null);
    }
  }, []);

  let success = false;
  useEffect(() => {
    if (success === false) {
      setError("가입하지 않은 회원입니다.");
      return;
    } else {
      setError("");
      navigate("/findPwAuth");
    }
  }, [success, navigate]);

  return <FindPw onSubmit={onSubmit} error={error} />;
};

export default FindPwForm;
