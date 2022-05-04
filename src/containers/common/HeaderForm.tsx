import React from "react";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router";
import { RootStateOrAny, useSelector } from "react-redux";

const HeaderForm = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    console.log("로그아웃");
    navigate("/");
  };

  const { user } = useSelector((state: RootStateOrAny) => state.user);
  console.log("user: ", user);

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderForm;
