import React, { MutableRefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { ErrorMessage } from "./Register";
import { CyanButtonStyle, SelectButtonStyle } from "../../styles/ButtonStyle";
import { Link } from "react-router-dom";

interface LoginProps {
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

const Login = ({ onSubmit, initialUid, onKakaoLogin, error }: LoginProps) => {
  const naverRef = useRef<any>();
  const onNaverLogin = () => {
    naverRef.current.children[0].click();
  };

  return (
    <LoginBlock>
      <h2>반갑습니다!</h2>
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="이메일"
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
