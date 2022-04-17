import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";

type RegisterFormProps = {
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
  .sub-register {
    font-size: 14px;
    text-align: right;
    a {
      color: ${palette.cyan[5]};
      &:hover {
        color: ${palette.cyan[3]};
      }
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1279px),
    @media screen and (max-width: 767px) {
  }
`;

const RegisterForm = ({ onSubmit, error }: RegisterFormProps) => {
  return (
    <RegisterFormBlock>
      <h3>
        <b>트레블메이커</b>와 함께 하세요!
      </h3>
      <form onSubmit={onSubmit}>
        <>
          <Input autoComplete="nickname" name="nickname" placeholder="닉네임" />
          <Input autoComplete="username" name="username" placeholder="이메일" />
          <Input
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
          />
          <Input
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
          />
          <Button
            to="/registerAuth"
            marginbottom={"26px"}
            fontSize={"18px"}
            cyan
            fullwidth
          >
            회원가입
          </Button>
          {error && alert({ error })}
        </>
      </form>
      <div className="sub-register">
        <Link to="/login">로그인</Link>
      </div>
    </RegisterFormBlock>
  );
};

export default RegisterForm;
