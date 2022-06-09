import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { CyanButtonStyle } from "../../styles/ButtonStyle";
import { Link } from "react-router-dom";
import { register } from "../../lib/api/auth";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../common/Loading";

interface RegisterType {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  error: string | null;
}

const RegisterBlock = styled.div`
  h2 {
    margin-bottom: 52px;
    font-size: 24px;
    text-align: center;
    b {
      font-weight: 700;
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
        color: ${palette.cyan[5]};
      }
    }
  }
`;

export const ErrorMessage = styled.div`
  margin-bottom: 26px;
  color: red;
  text-align: center;
`;

const Register = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state) {
      Swal.fire({
        title: "회원가입을 위해 서비스 이용 약관 동의가 필요합니다",
        text: "",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: palette.gray[5],
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/privacyPolicy");
        }
      });
    }
  }, [state, navigate]);

  // 폼 등록 이벤트 핸들러
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoading(true);

      const form = e.target as HTMLFormElement;
      const $inputs = Array.from(form.querySelectorAll("input"));

      const [inputNickname, inputEmail, inputPw, inputPwConfirm] = $inputs.map(
        ($input) => $input.value
      );

      if ([inputNickname, inputEmail, inputPw, inputPwConfirm].includes("")) {
        setError("빈 칸을 모두 입력하세요.");
        return;
      } else if (inputPw !== inputPwConfirm) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      } else {
        setError(null);
      }

      // API 호출
      register(inputNickname, inputEmail, inputPw)
        .then((res) => {
          if (res) {
            setError("이미 사용중인 아이디입니다."); // 닉네임 중복 or 이메일 중복 or 비밀번호 형식 미충족
            return;
          } else {
            setError("");
            navigate("/registerAuth", { state: inputEmail });
          }
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate]
  );

  return (
    <>
      <RegisterBlock>
        <h2>
          <b>트레블메이커</b>와 함께 하세요!
        </h2>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            name="id"
            autoComplete="username"
            placeholder="아이디"
          />
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
            name="confirm-password"
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
      {loading ? <Loading /> : ""}
    </>
  );
};

export default Register;
