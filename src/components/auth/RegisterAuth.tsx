import { Link } from "react-router-dom";
import styled from "styled-components";
import { CyanButtonStyle } from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { ErrorMessage } from "./Register";

interface RegisterAuthProps {
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
      font-weight: 600;
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
          color: ${palette.cyan[4]};
        }
      }
    }
  }
  Input {
    margin-bottom: 52px;
  }
`;

const RegisterAuth = ({ onSubmit, reSubmit, error }: RegisterAuthProps) => {
  return (
    <RegisterAuthBlock>
      <div className="material-icons">mail_outline</div>
      <h2>
        <b>이메일 인증 코드</b>가 발송되었습니다.
      </h2>
      <h3>
        이메일이 도착하지 않았나요?
        <button className="resubmit-btn">
          <Link
            to="/register-auth"
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
  );
};

export default RegisterAuth;
