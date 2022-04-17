import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";
import { SelectButtonStyle } from "./PrivacyPolicy";

type FindPwCompleteProps = {
  reSubmit: React.FormEventHandler<HTMLFormElement>;
};

const FindPwCompleteBlock = styled.div`
  .material-icons {
    display: block;
    margin-bottom: 52px;
    font-size: 32px;
    text-align: center;
    color: ${palette.gray[5]};
  }
  h3 {
    margin-bottom: 26px;
    font-size: 24px;
    text-align: center;
    b {
      font-weight: 600;
    }
  }
  > span {
    display: block;
    margin-bottom: 104px;
    text-align: center;
    button {
      margin: 0 0 0 5px;
      padding: 0;
      cursor: pointer;
      font-size: 16px;
      color: ${palette.cyan[5]};
      &:hover {
        color: ${palette.cyan[4]};
      }
    }
  }
`;

const FindPwComplete = ({ reSubmit }: FindPwCompleteProps) => {
  return (
    <FindPwCompleteBlock>
      <div className="material-icons">mail_outline</div>
      <h3>
        <b>이메일 인증 코드</b>가 발송되었습니다.
      </h3>
      <span>
        이메일이 도착하지 않았나요?
        <Link
          to="/findPwComplete"
          // onClick={reSubmit}
        >
          재전송
        </Link>
      </span>
      <SelectButtonStyle>
        <Button
          // to="/login"
          cyan
          fullwidth
        >
          로그인하러 가기
        </Button>
        <Button
          // to="/"
          gray
          fullwidth
        >
          메인으로
        </Button>
      </SelectButtonStyle>
    </FindPwCompleteBlock>
  );
};

export default FindPwComplete;
