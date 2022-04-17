import styled from "styled-components";
import palette from "../../styles/palette";
import Button from "../common/Button";
import { SelectButtonStyle } from "./PrivacyPolicy";

const RegisterCompleteBlock = styled.div`
  .material-icons {
    display: block;
    margin-bottom: 52px;
    font-size: 32px;
    text-align: center;
    color: ${palette.gray[5]};
    font-weight: 900;
  }
  h3 {
    margin-bottom: 104px;
    font-size: 24px;
    text-align: center;
    b {
      font-weight: 600;
    }
  }
`;

const RegisterComplete = () => {
  return (
    <RegisterCompleteBlock>
      <div className="material-icons">done</div>
      <h3>
        <b>회원가입</b>이 완료되었습니다.
      </h3>
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
    </RegisterCompleteBlock>
  );
};

export default RegisterComplete;
