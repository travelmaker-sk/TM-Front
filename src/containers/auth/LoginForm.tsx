import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../types";

const LoginForm = () => {
  // useDispatch(): 액션을 발생시킨다.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  // useSelector(): 리덕스 스토어의 상태를 가져온다.
  const { form, auth, authError, user } = useSelector<RootState>(
    ({ auth, user }) => ({
      form: auth.login,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    })
  );

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  // useEffect(): 렌더링 되면(상태가 변하면) 업데이트한다.
  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/");
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
