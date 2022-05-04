import React, { useCallback, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SetProfile from "../../components/mypage/SetProfile";

const SetProfileForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // TODO. API 호출
    },
    [navigate]
  );

  const { user } = useSelector((state: RootStateOrAny) => state.user);
  console.log("user: ", user);

  return <SetProfile user={user} onSubmit={onSubmit} error={error} />;
};

export default SetProfileForm;
