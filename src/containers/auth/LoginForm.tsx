import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../../components/auth/Login";
import { login } from "../../api/auth";
import { RootStateOrAny, useSelector } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const { user } = useSelector((state: RootStateOrAny) => state.user);

  const initialUid = useRef(localStorage.getItem("tm-saved-id") ?? "");

  // 폼 등록 이벤트 핸들러
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const $inputs = Array.from(form.querySelectorAll("input"));

      const [inputEmail, inputPw, checkSaveId, checkKeepLogin] = $inputs.map(
        ($input) => ($input.type === "checkbox" ? $input.checked : $input.value)
      );

      if ([inputEmail, inputPw].includes("")) {
        setError("빈 칸을 모두 입력하세요.");
        return;
      } else {
        setError(null);
      }

      // API 호출
      login(inputEmail as string, inputPw as string)
        .then((res) => {
          let token = localStorage.getItem("Authorization");
          console.log("token: ", token);
          if (checkSaveId)
            localStorage.setItem("tm-saved-id", inputEmail as string);
          if (checkKeepLogin)
            localStorage.setItem("Authorization", token as string);
          if (!token) {
            setError("아이디나 비밀번호가 일치하지 않습니다.");
            return;
          } else {
            setError("");
            navigate("/");
          }
        })
        .catch((err) => {
          console.warn(err);
        });

      // let token = localStorage.getItem("Authorization");
      // // API 호출
      // myInfo(token as string)
      //   .then((res) => {
      //     setUsername(res.username);
      //     setEmail(res.email);
      //   })
      //   .catch((err) => {
      //     console.warn(err);
      //   });
      setUsername("test");
      setEmail("test@test.com");

      user.nickname = username;
      user.email = email;
    },
    [navigate, user, username, email]
  );

  const onKakaoLogin = () => {
    const { REACT_APP_KAKAO_REST_API_KEY, REACT_APP_BASE_URL } = process.env;
    const redirectUri = `${REACT_APP_BASE_URL}/kakaoLogin`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  useEffect(() => {
    const { REACT_APP_NAVER_CLIENT_ID, REACT_APP_BASE_URL } = process.env;

    // @ts-ignore
    let naver_id_login = new window.naver_id_login(
      REACT_APP_NAVER_CLIENT_ID,
      `${REACT_APP_BASE_URL}/naverLogin`
    );

    const state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2, 40);
    naver_id_login.setDomain(REACT_APP_BASE_URL);
    naver_id_login.setState(state);
    // naver_id_login.setPopup();
    naver_id_login.init_naver_id_login();
  }, []);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <Login
      onSubmit={onSubmit}
      initialUid={initialUid}
      onKakaoLogin={onKakaoLogin}
      error={error}
    />
  );
};

export default LoginForm;
