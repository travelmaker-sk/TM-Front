import styled from "styled-components";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";
import { ErrorMessage } from "./Register";

type FindPwProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  error: string | null;
};

const FindPwBlock = styled.div`
  h3 {
    margin-bottom: 26px;
    font-size: 24px;
    text-align: center;
  }
  span {
    display: block;
    margin-bottom: 104px;
    text-align: center;
    b {
      cursor: pointer;
      font-size: 16px;
      color: ${palette.cyan[5]};
      &:hover {
        color: ${palette.cyan[4]};
      }
    }
  }
  Input {
    margin-bottom: 52px;
  }
`;

const FindPw = ({ onSubmit, error }: FindPwProps) => {
  return (
    <FindPwBlock>
      <h3>임시 비밀번호 발급</h3>
      <span>
        가입한 <b>이메일 주소</b>를 입력해주세요.
      </span>
      <form onSubmit={onSubmit}>
        <Input name="email" placeholder="이메일" type="text" />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button
          // to="/findPwComplete"
          cyan
          fullwidth
        >
          확인
        </Button>
      </form>
    </FindPwBlock>
  );
};

export default FindPw;
