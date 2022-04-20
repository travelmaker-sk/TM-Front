import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import Register from "../../components/auth/Register";
import { register } from "../../lib/api/auth";
import { useLocation } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
    if (!state) {
      alert("회원가입을 위해 서비스 이용 약관 동의가 필요합니다.");
      navigate("/privacyPolicy");
    }
  }, [state, navigate]);

  // 폼 등록 이벤트 핸들러
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const $inputs = Array.from(form.querySelectorAll("input"));

      const [inputNickname, inputEmail, inputPw, inputPwConfirm] = $inputs.map(
        ($input) => $input.value
      );
      console.log("nickname:", inputNickname);
      console.log("email:", inputEmail);
      console.log("password:", inputPw);
      console.log("passwordConfirm:", inputPwConfirm);

      if ([inputNickname, inputEmail, inputPw, inputPwConfirm].includes("")) {
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

      // API 호출
      register({
        nickname: inputNickname,
        email: inputEmail,
        password: inputPw,
      }).then((registerResult) => {
        if (!registerResult) {
          setError("회원가입 실패");
          return;
        } else {
          setError("");
          navigate("/registerAuth");
        }
      });
    },
    [navigate]
  );

  return <Register onSubmit={onSubmit} error={error} />;
};

export default RegisterForm;
