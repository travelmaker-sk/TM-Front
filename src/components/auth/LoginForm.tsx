import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";

type LoginFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  initialUid: MutableRefObject<string>;
  error: string | null;
};

const LoginFormBlock = styled.div`
  h3 {
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

  @media screen and (min-width: 768px) and (max-width: 1279px),
    @media screen and (max-width: 767px) {
    .sns-login {
      display: block;
      Button:last-child {
        margin-left: 0;
      }
    }
  }
`;

const LoginForm = ({ onSubmit, initialUid, error }: LoginFormProps) => {
  return (
    <LoginFormBlock>
      <h3>반갑습니다!</h3>
      <form onSubmit={onSubmit}>
        <>
          <Input
            autoComplete="email"
            name="username"
            placeholder="이메일"
            defaultValue={initialUid.current}
          />
          <Input
            autoComplete="current-password"
            name="password"
            placeholder="비밀번호"
            type="password"
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
          <Button marginbottom={"26px"} fontSize={"18px"} cyan fullwidth>
            로그인
          </Button>
          {error && alert({ error })}
        </>
      </form>
      <div className="sub-login sub-login-2">
        <Link to="/findPwAuth">비밀번호 찾기</Link>
        <Link to="/privacyPolicy">회원가입</Link>
      </div>
      <span>또는</span>
      <div className="sns-login">
        <Button
          fontSize={"18px"}
          color={"#fff"}
          background={"#00BF18"}
          fullwidth
        >
          <img src="./images/naver-icon.png" alt="naver-icon" />
          네이버 로그인
        </Button>
        <Button fontSize={"18px"} background={"#FFEB3B"} fullwidth>
          <img src="./images/kakao-icon.png" alt="kakao-icon" />
          카카오 로그인
        </Button>
      </div>
    </LoginFormBlock>
  );
};

export default LoginForm;
