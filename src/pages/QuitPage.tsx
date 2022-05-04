import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import AuthTemplate from "../components/auth/AuthTemplate";
import Quit from "../components/mypage/Quit";

const QuitPage = () => {
  const { user } = useSelector((state: RootStateOrAny) => state.user);
  console.log("user: ", user);

  return (
    <AuthTemplate>
      <Quit user={user} />
    </AuthTemplate>
  );
};

export default QuitPage;
