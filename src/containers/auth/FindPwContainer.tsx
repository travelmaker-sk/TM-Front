import React, { useEffect, useState } from "react";
import FindPwAuth from "../../components/auth/FindPwAuth";

const FindPwContainer = () => {
  const [error, setError] = useState<string | null>(null);

  const onFindPw = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  let success = true;
  useEffect(() => {
    if (success === false) {
      setError("가입하지 않은 회원입니다.");
      return;
    } else {
      setError("");
    }
  });

  return <FindPwAuth onSubmit={onFindPw} error={error} />;
};

export default FindPwContainer;
