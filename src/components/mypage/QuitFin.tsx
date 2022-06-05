import styled from "styled-components";
import { CyanButtonStyle, LinkButton } from "../../styles/ButtonStyle";
import palette from "../../styles/palette";

const QuitFinBlock = styled.div`
  .material-icons {
    display: block;
    margin-bottom: 52px;
    font-size: 32px;
    text-align: center;
    color: ${palette.gray[5]};
    font-weight: 900;
  }
  h2 {
    margin-bottom: 104px;
    font-size: 20px;
    line-height: 1.5em;
    text-align: center;
    b {
      font-weight: 700;
    }
  }
`;

const QuitFin = () => {
  return (
    <QuitFinBlock>
      <div className="material-icons">done</div>
      <h2>
        탈퇴가 정상적으로 완료되었습니다.
        <br />
        지금까지 <b>트레블메이커</b>를 이용해주셔서 감사합니다.
      </h2>
      <CyanButtonStyle>
        <button>
          <LinkButton to="/">메인 페이지로 이동</LinkButton>
        </button>
      </CyanButtonStyle>
    </QuitFinBlock>
  );
};

export default QuitFin;
