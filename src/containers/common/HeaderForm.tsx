import React, { useCallback } from "react";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";

const HeaderForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem("tm-token");
    navigate("/");
  }, [dispatch, navigate]);

  const { user } = useSelector((state: RootStateOrAny) => state.user);

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderForm;
