import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Button from "../common/Button";

const PrivacyBlock = styled.div`
  h3 {
    margin-bottom: 52px;
    font-size: 24px;
    text-align: center;
    b {
      font-weight: 600;
    }
  }
  > span {
    display: block;
    margin-bottom: 26px;
    color: ${palette.gray[5]};
  }
  .textarea {
    height: 300px;
    margin-bottom: 52px;
    overflow-y: scroll;
  }
`;

export const SelectButtonStyle = styled.div`
  display: flex;
  justify-content: space-between;
  Button:last-child {
    margin-left: 15px;
  }
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyBlock>
      <h3>
        <b>트레블메이커</b>와 함께 하세요!
      </h3>
      <span>서비스 이용 약관</span>
      <div className="textarea">
        서<br />비<br />스<br />이<br />용<br />약<br />관<br />입<br />니<br />
        다<br />서<br />비<br />스<br />이<br />용<br />약<br />관<br />입<br />
        니<br />
        다<br />서<br />비<br />스<br />이<br />용<br />약<br />관<br />입<br />
        니<br />
        다<br />
      </div>
      <SelectButtonStyle>
        <Button
          // to="/register"
          cyan
          fullwidth
        >
          ✓ 동의
        </Button>
        <Button
          // to="/"
          gray
          fullwidth
        >
          취소
        </Button>
      </SelectButtonStyle>
    </PrivacyBlock>
  );
};

export default PrivacyPolicy;
