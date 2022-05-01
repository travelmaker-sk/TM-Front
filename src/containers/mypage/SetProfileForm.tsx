import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import SetProfile from "../../components/mypage/SetProfile";

interface SetProfileFromProps {
  user: {
    nickname: string;
    email: string;
    password: string;
  };
}

const SetProfileForm = ({ user }: SetProfileFromProps) => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const $inputs = Array.from(form.querySelectorAll("input"));

      // API 호출
    },
    [navigate]
  );

  return <SetProfile user={user} onSubmit={onSubmit} error={error} />;
};

export default SetProfileForm;
