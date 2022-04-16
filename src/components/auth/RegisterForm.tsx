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

const RegisterFormBlock = styled.div`
  h3 {
    margin-bottom: 52px;
    font-size: 24px;
    text-align: center;
    b {
      font-weight: 600;
    }
  }
  .sub-login {
    font-size: 14px;
    text-align: right;
    a {
      color: ${palette.cyan[5]};
      &:hover {
        color: ${palette.cyan[4]};
      }
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1279px),
    @media screen and (max-width: 767px) {
  }
`;

const RegisterForm = ({ onChange, onSubmit, error }: AuthFormProps) => {
  return (
    <RegisterFormBlock>
      <h3>
        <b>트레블메이커</b>와 함께 하세요!
      </h3>
      <form onSubmit={onSubmit}>
        <>
          <Input
            autoComplete="nickname"
            name="nickname"
            placeholder="닉네임"
            onChange={onChange}
          />
          <Input
            autoComplete="email"
            name="email"
            placeholder="이메일"
            onChange={onChange}
          />
          <Input
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
          />
          <Input
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
          />
          <Button marginBottom={"26px"} cyan fullWidth>
            회원가입
          </Button>
          {error && alert({ error })}
        </>
      </form>
      <div className="sub-login">
        <Link to="/login">로그인</Link>
      </div>
    </RegisterFormBlock>
  );
};

export default RegisterForm;
