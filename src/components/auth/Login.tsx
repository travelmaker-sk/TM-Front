import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { ErrorMessage } from "./Register";
import { CyanButtonStyle, SelectButtonStyle } from "../../styles/ButtonStyle";
import { Link } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../lib/api/auth";

interface LoginType {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  initialUid: MutableRefObject<string>;
  onKakaoLogin: () => void;
  error: string | null;
}

const LoginBlock = styled.div`
  h2 {
    margin-bottom: 52px;
    font-size: 24px;
    text-align: center;
  }
  .sub-login {
    font-size: 14px;
    color: ${palette.gray[5]};
  }
  .sub-login-1 {
    margin-bottom: 26px;
    > label:last-child {
      margin-left: 10px;
    }
  }
  .sub-login-2 {
    margin-bottom: 52px;
    display: flex;
    justify-content: space-between;
    > a:first-child {
      &:hover {
        color: ${palette.gray[4]};
      }
    }
    > a:last-child {
      color: ${palette.cyan[5]};
      &:hover {
        color: ${palette.cyan[3]};
      }
    }
  }
  .login-btn {
    margin-bottom: 26px;
  }
  > span {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: ${palette.gray[5]};
    margin-bottom: 26px;
    &::before,
    &::after {
      content: "";
      flex-grow: 1;
      background: ${palette.gray[5]};
      height: 0.5px;
      font-size: 0px;
      line-height: 0px;
    }
    &::before {
      margin-right: 15px;
    }
    &::after {
      margin-left: 15px;
    }
  }
  .sns-login {
    display: flex;
    justify-content: space-between;
    Button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    Button:last-child {
      margin-left: 15px;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
  .sns-btn {
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
    // max-height: 45.833px;
  }
  #naver_id_login {
    display: none;
  }
  .naver-btn {
    color: #fff;
    background: #03c75a;
    // Mobile
    @media screen and (max-width: 767px) {
      margin-bottom: 16px !important;
    }
  }
  #custom-login-btn {
    display: none;
  }
  .kakao-btn {
    background: #fddc3f;
    // Mobile
    @media screen and (max-width: 767px) {
      margin-left: 0 !important;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: RootStateOrAny) => state.user);

  const initialUid = useRef(localStorage.getItem("tm-saved-id") ?? "");

  const naverRef = useRef<any>();
  const onNaverLogin = () => {
    naverRef.current.children[0].click();
  };

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
          let token = localStorage.getItem("tm-token");

          if (checkSaveId)
            localStorage.setItem("tm-saved-id", inputEmail as string);
          if (checkKeepLogin) localStorage.setItem("tm-token", token as string);

          if (token === "undefined") {
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
    },
    [navigate]
  );

  // 카카오 로그인
  const onKakaoLogin = () => {
    const { REACT_APP_KAKAO_REST_API_KEY, REACT_APP_BASE_URL } = process.env;
    const redirectUri = `${REACT_APP_BASE_URL}/kakaoLogin`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  // 네이버 로그인
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
    <LoginBlock>
      <h2>반갑습니다!</h2>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="id"
          autoComplete="username"
          placeholder="아이디"
          defaultValue={initialUid.current}
        />
        <Input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="비밀번호"
        />
        <div className="sub-login sub-login-1">
          <label>
            <input type="checkbox" name="save-id" id="save-id" />
            아이디 저장
          </label>
          <label>
            <input type="checkbox" name="save-id" id="keep-login" />
            로그인 유지
          </label>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <CyanButtonStyle>
          <button type="submit" className="login-btn">
            로그인
          </button>
        </CyanButtonStyle>
      </form>
      <div className="sub-login sub-login-2">
        <Link to="/findPw">비밀번호 찾기</Link>
        <Link to="/privacyPolicy">회원가입</Link>
      </div>
      <span>또는</span>
      <div className="sns-login">
        <SelectButtonStyle>
          <div id="naver_id_login" ref={naverRef}></div>
          <button className="sns-btn naver-btn" onClick={onNaverLogin}>
            <img src="./images/naver-icon.png" alt="naver" />
            네이버 로그인
          </button>
          <button className="sns-btn kakao-btn" onClick={onKakaoLogin}>
            <img src="./images/kakao-icon.png" alt="kakao" />
            카카오 로그인
          </button>
        </SelectButtonStyle>
      </div>
    </LoginBlock>
  );
};

export default Login;
