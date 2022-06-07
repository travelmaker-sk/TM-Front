import styled from "styled-components";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { ErrorMessage } from "./Register";
import { CyanButtonStyle } from "../../styles/ButtonStyle";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { findPw } from "../../lib/api/auth";

interface FindPwType {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  error: string | null;
}

const FindPwBlock = styled.div`
  h2 {
    margin-bottom: 26px;
    font-size: 24px;
    text-align: center;
  }
  h3 {
    display: block;
    margin-bottom: 104px;
    text-align: center;
    b {
      color: ${palette.cyan[5]};
    }
  }
  Input {
    margin-bottom: 52px;
  }
`;

const FindPw = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const $inputs = Array.from(form.querySelectorAll("input"));

      const [inputEmail] = $inputs.map(($input) => $input.value);

      if ([inputEmail].includes("")) {
        setError("빈 칸을 모두 입력하세요.");
        return;
      } else {
        setError(null);
      }

      // API 호출
      findPw(inputEmail)
        .then((res) => {
          if (res) {
            setError("가입하지 않은 회원입니다.");
          } else {
            setError("");
          }
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          navigate("/findPwFin");
        });
    },
    [navigate]
  );

  return (
    <FindPwBlock>
      <h2>임시 비밀번호 발급</h2>
      <h3>
        가입한 <b>이메일 주소</b>를 입력해주세요.
      </h3>
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="이메일"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <CyanButtonStyle>
          <button type="submit">확인</button>
        </CyanButtonStyle>
      </form>
    </FindPwBlock>
  );
};

export default FindPw;
