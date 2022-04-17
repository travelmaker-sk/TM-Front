import styled from "styled-components";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";

const FindPwAuthBlock = styled.div`
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
    margin-bottom: 104px;
  }
`;

const FindPwAuth = () => {
  return (
    <FindPwAuthBlock>
      <h3>임시 비밀번호 발급</h3>
      <span>
        가입한 <b>이메일 주소</b>를 입력해주세요.
      </span>
      <Input name="emailAuthCode" placeholder="이메일" type="text" />
      <Button to="/findPwComplete" cyan fullwidth>
        확인
      </Button>
    </FindPwAuthBlock>
  );
};

export default FindPwAuth;
