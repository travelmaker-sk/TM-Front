import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../styles/palette";
import Button from "../common/Button";

// 회원가입 / 로그인 폼
const AuthFormBlock = styled.div`
  h3 {
    color: ${palette.gray[6]};
    margin-bottom: 4rem;
    text-align: center;
    font-size: 1.5rem;
  }
`;

// 스타일링된 input
const StyledInput = styled.input`
  display: block;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[6]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 30vw;
  margin-bottom: 2rem;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.cyan[5]};
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin: 2rem 0;
`;

const Footer = styled.div`
  text-align: right;
  a {
    color: ${palette.gray[6]};
    &:hover {
      color: ${palette.gray[5]};
    }
  }
`;

const textMap = {
  login: "로그인",
  register: "회원가입",
};

// 에러 메세지
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>
        {type === "login" ? (
          <span>반갑습니다!</span>
        ) : (
          <span>
            <b>트레블메이커</b>와 함께 하세요!
          </span>
        )}
      </h3>
      <form onSubmit={onSubmit}>
        {type === "register" && (
          <StyledInput
            autoComplete="nickname"
            name="nickname"
            placeholder="닉네임"
            onChange={onChange}
            value={form.nickname}
          />
        )}
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          autoComplete="current-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === "register" && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "2rem" }}>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
