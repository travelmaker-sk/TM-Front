import React, { useEffect, useState } from "react";
import FindPw from "../../components/auth/FindPw";

const FindPwForm = () => {
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

  return <FindPw onSubmit={onFindPw} error={error} />;
};

export default FindPwForm;
