import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";

type AuthFormProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  error: string | null;
};

const AuthFormBlock = styled.div`
  h3 {
    color: ${palette.gray[6]};
    margin-bottom: 4rem;
    text-align: center;
    font-size: 1.5rem;
  }
`;

const Footer = styled.span`
  a {
    color: ${palette.gray[6]};
    &:hover {
      color: ${palette.gray[5]};
    }
  }
`;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   font-size: 18px;
//   border-radius: 4px;
//   cursor: pointer;

//   color: white;
//   background: ${palette.gray[8]};
//   &:hover {
//     background: ${palette.gray[6]};
//   }
// `;

const LoginForm = ({ onChange, onSubmit, error }: AuthFormProps) => {
  return (
    <AuthFormBlock>
      <h3>반갑습니다!</h3>
      <form onSubmit={onSubmit}>
        <>
          <Input
            autoComplete="email"
            name="email"
            placeholder="이메일"
            onChange={onChange}
          />
          <Input
            autoComplete="current-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
          />
          <div>
            <label>
              <input type="checkbox" name="save-id" id="save-id" />
              아이디 저장
            </label>
            <label>
              <input type="checkbox" name="save-id" id="keep-login" />
              로그인 유지
            </label>
          </div>
          <Button cyan fullWitdh>
            로그인
          </Button>
          {error && alert({ error })}
        </>
      </form>
      <div>
        <Link to="/register">비밀번호 찾기</Link>
        <Footer>
          <Link to="/register">회원가입</Link>
        </Footer>
      </div>
      <span>또는</span>
      <div>
        <Button>네이버 로그인</Button>
        <Button>카카오 로그인</Button>
      </div>
    </AuthFormBlock>
  );
};

export default LoginForm;
