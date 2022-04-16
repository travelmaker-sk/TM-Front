import React from "react";
import Header from "../../components/common/Header";

const HeaderContainer = () => {
  const onLogout = () => {};

  return (
    <Header
      user={{ nickname: "", username: "", password: "" }}
      onLogout={onLogout}
    />
  );
};

export default HeaderContainer;
