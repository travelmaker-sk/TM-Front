import React, { useCallback } from "react";
import FindPwAuth from "../../components/auth/FindPwAuth";

const FindPwAuthForm = () => {
  const reSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("이메일 인증 코드 재전송");
  }, []);

  return <FindPwAuth reSubmit={reSubmit} />;
};

export default FindPwAuthForm;
