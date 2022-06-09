import styled from "styled-components";
import palette from "../../styles/palette";
import {
  CyanButtonStyle,
  GrayButtonStyle,
  LinkButton,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import { Link } from "react-router-dom";
import { useCallback } from "react";

const FindPwFinBlock = styled.div`
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
        color: ${palette.cyan[4]};
        &:hover {
          color: ${palette.cyan[4]};
        }
      }
    }
  }
`;

const FindPwFin = () => {
  const reSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("이메일 인증 코드 재전송");
  }, []);

  return (
    <FindPwFinBlock>
      <div className="material-icons">mail_outline</div>
      <h2>이메일이 발송되었습니다.</h2>
      <h3>
        이메일이 도착하지 않았나요?
        <button className="resubmit-btn">
          <Link
            to="/findPwFin"
            // onClick={reSubmit}
          >
            재전송
          </Link>
        </button>
      </h3>
      <SelectButtonStyle>
        <CyanButtonStyle>
          <button>
            <LinkButton to="/login">로그인 페이지로 이동</LinkButton>
          </button>
        </CyanButtonStyle>
        <GrayButtonStyle>
          <button>
            <LinkButton to="/">메인 페이지로 이동</LinkButton>
          </button>
        </GrayButtonStyle>
      </SelectButtonStyle>
    </FindPwFinBlock>
  );
};

export default FindPwFin;
