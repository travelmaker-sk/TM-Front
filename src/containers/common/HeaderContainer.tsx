import React from "react";
import Header from "../../components/common/Header";

const HeaderContainer = () => {
  const onLogout = () => {};

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

export default HeaderContainer;
