import React from "react";
import Header from "../../components/common/Header";

const HeaderForm = () => {
  const onLogout = () => {
    console.log("로그아웃");
  };

  return (
    <Header
      // user={{
      //   nickname: "닉네임예시",
      //   username: "username1234@google.com",
      //   password: "pw1234",
      // }}
      user={null}
      onLogout={onLogout}
    />
  );
};

export default HeaderForm;
