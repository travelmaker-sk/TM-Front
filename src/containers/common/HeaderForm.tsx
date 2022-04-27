import React from "react";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router";

const HeaderForm = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    console.log("로그아웃");
    localStorage.removeItem("tm-token");
    navigate("/");
  };

  return (
    <Header
      // user={{
      //   nickname: "닉네임예시",
      //   email: "email1234@google.com",
      //   password: "pw1234",
      // }}
      user={null}
      onLogout={onLogout}
    />
  );
};

export default HeaderForm;
