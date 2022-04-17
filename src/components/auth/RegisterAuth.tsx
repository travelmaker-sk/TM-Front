import styled from "styled-components";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";

const RegisterAuthBlock = styled.div`
  .material-icons {
    display: block;
    margin-bottom: 52px;
    font-size: 32px;
    text-align: center;
    color: ${palette.gray[6]};
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
      margin: 0 0 0 10px;
      padding: 0;
      cursor: pointer;
      font-size: 16px;
      color: ${palette.cyan[5]};
      &:hover {
        color: ${palette.cyan[4]};
      }
    }
  }
  Input {
    margin-bottom: 104px;
  }
`;

const RegisterAuth = () => {
  return (
    <RegisterAuthBlock>
      <div className="material-icons">mail_outline</div>
      <h3>
        <b>이메일 인증 코드</b>가 발송되었습니다.
      </h3>
      <span>
        이메일이 도착하지 않았나요?
        <button>재전송</button>
      </span>
      <Input
        name="emailAuthCode"
        placeholder="인증번호를 입력해주세요"
        type="text"
      />
      <Button to="/registerComplete" cyan fullwidth>
        확인
      </Button>
    </RegisterAuthBlock>
  );
};

export default RegisterAuth;
