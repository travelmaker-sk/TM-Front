import React, { useEffect } from "react";
import styled from "styled-components";
import {
  CyanButtonStyle,
  GrayButtonStyle,
  LinkButton,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const PrivacyBlock = styled.div`
  h2 {
    margin-bottom: 52px;
    font-size: 24px;
    text-align: center;
    b {
      font-weight: 600;
    }
  }
  h4 {
    display: block;
    margin-bottom: 26px;
    color: ${palette.gray[5]};
  }
  .textarea {
    height: 200px;
    margin-bottom: 52px;
    overflow: auto;
    // Mobile
    @media screen and (max-width: 767px) {
      height: 130px;
    }
  }
`;

const PrivacyPolicy = () => {
  const { user } = useSelector((state: RootStateOrAny) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <PrivacyBlock>
      <h2>
        <b>트레블메이커</b>와 함께 하세요!
      </h2>
      <h4>서비스 이용 약관</h4>
      <div className="textarea">
        서<br />비<br />스<br />이<br />용<br />약<br />관<br />입<br />니<br />
        다<br />서<br />비<br />스<br />이<br />용<br />약<br />관<br />입<br />
        니<br />
        다<br />서<br />비<br />스<br />이<br />용<br />약<br />관<br />입<br />
        니<br />
        다<br />
      </div>
      <SelectButtonStyle>
        <CyanButtonStyle>
          <button>
            <LinkButton to="/register" state={{ check: true }}>
              ✓ 동의
            </LinkButton>
          </button>
        </CyanButtonStyle>
        <GrayButtonStyle>
          <button>
            <LinkButton to="/">취소</LinkButton>
          </button>
        </GrayButtonStyle>
      </SelectButtonStyle>
    </PrivacyBlock>
  );
};

export default PrivacyPolicy;
