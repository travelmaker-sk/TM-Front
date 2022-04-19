import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { CyanButtonStyle } from "../../styles/ButtonStyle";
import { Link } from "react-router-dom";

type RegisterProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  error: string | null;
};

const RegisterBlock = styled.div`
  h2 {
    margin-bottom: 52px;
    font-size: 24px;
    text-align: center;
    b {
      font-weight: 600;
    }
  }
  .register-btn {
    margin-bottom: 26px;
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
`;

export const ErrorMessage = styled.div`
  margin-bottom: 26px;
  color: red;
  text-align: center;
  font-size: 14px;
`;

const Register = ({ onSubmit, error }: RegisterProps) => {
  return (
    <RegisterBlock>
      <h2>
        <b>트레블메이커</b>와 함께 하세요!
      </h2>
      <form onSubmit={onSubmit}>
        <Input name="nickname" autoComplete="nickname" placeholder="닉네임" />
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="이메일"
        />
        <Input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="비밀번호"
        />
        <Input
          type="password"
          name="passwordConfirm"
          autoComplete="new-password"
          placeholder="비밀번호 확인"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <CyanButtonStyle>
          <button type="submit" className="register-btn">
            회원가입
          </button>
        </CyanButtonStyle>
      </form>
      <div className="sub-register">
        <Link to="/login">로그인</Link>
      </div>
    </RegisterBlock>
  );
};

export default Register;
