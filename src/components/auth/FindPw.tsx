import styled from "styled-components";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { ErrorMessage } from "./Register";
import { CyanButtonStyle } from "../../styles/ButtonStyle";

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

const FindPw = ({ onSubmit, error }: FindPwType) => {
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
