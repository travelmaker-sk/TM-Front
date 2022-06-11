import { Link } from "react-router-dom";
import styled from "styled-components";
import { CyanButtonStyle } from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { ErrorMessage } from "./Register";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { registerAuth } from "../../lib/api/auth";
import { useLocation } from "react-router-dom";
import Loading from "../common/Loading";

interface RegisterAuthType {
  reSubmit: React.FormEventHandler<HTMLFormElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  error: string | null;
}

const RegisterAuthBlock = styled.div`
  .material-icons {
    display: block;
    margin-bottom: 52px;
    font-size: 32px;
    text-align: center;
    color: ${palette.gray[5]};
  }
  h2 {
    margin-bottom: 26px;
    font-size: 24px;
    text-align: center;
    b {
      font-weight: 700;
    }
  }
  h3 {
    display: block;
    margin-bottom: 104px;
    text-align: center;
    .resubmit-btn {
      margin: 0 0 0 5px;
      padding: 0;
      cursor: pointer;
      a {
        font-size: 16px;
        color: ${palette.cyan[5]};
        &:hover {
          color: ${palette.cyan[5]};
        }
      }
    }
  }
  Input {
    margin-bottom: 52px;
  }
`;

const RegisterAuth = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoading(true);

      const form = e.target as HTMLFormElement;
      const $inputs = Array.from(form.querySelectorAll("input"));

      const [inputAuthCode] = $inputs.map(($input) => $input.value);

      if ([inputAuthCode].includes("")) {
        setError("빈 칸을 모두 입력하세요.");
        return;
      } else {
        setError(null);
      }
      // API 호출
      registerAuth(email as string, inputAuthCode as string)
        .then((res) => {
          console.log("auth res", res);
          if (res) {
            setError("인증번호가 일치하지 않습니다.");
          } else {
            setError("");
            navigate("/registerFin");
          }
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [email, navigate]
  );

  const reSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("이메일 인증 코드 재전송");
  }, []);

  return (
    <>
      <RegisterAuthBlock>
        <div className="material-icons">mail_outline</div>
        <h2>
          <b>이메일 인증 코드</b>가 발송되었습니다.
        </h2>
        <h3>
          이메일이 도착하지 않았나요?
          <button className="resubmit-btn">
            <Link
              to="/registerAuth"
              // onClick={reSubmit}
            >
              재전송
            </Link>
          </button>
        </h3>
        <form onSubmit={onSubmit}>
          <Input
            name="emailAuthCode"
            placeholder="인증번호를 입력해주세요"
            type="text"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <CyanButtonStyle>
            <button type="submit">확인</button>
          </CyanButtonStyle>
        </form>
      </RegisterAuthBlock>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default RegisterAuth;
