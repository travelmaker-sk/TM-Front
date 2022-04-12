import React from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/common/Header";

const HeaderContainer = () => {
  const dispatch = useDispatch();

  const onLogout = () => {};

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
