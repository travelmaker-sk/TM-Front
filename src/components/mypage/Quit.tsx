import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  CyanButtonStyle,
  GrayButtonStyle,
  LinkButton,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import Input from "../common/Input";
import { ErrorMessage } from "../auth/Register";

interface QuitProps {
  user: {
    nickname: string;
    email: string;
    password: string;
  };
}

const QuitBlock = styled.div`
  .material-icons {
    display: block;
    margin-bottom: 52px;
    font-size: 32px;
    text-align: center;
    color: ${palette.gray[5]};
  }
  h2 {
    margin-bottom: 52px;
    font-size: 24px;
    text-align: center;
  }
  h3 {
    display: block;
    margin-bottom: 52px;
    text-align: center;
    b {
      font-weight: 600;
    }
  }
  Input {
    margin-bottom: 52px;
  }
`;

const Quit = ({ user }: QuitProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [quitEmail, setQuitEamil] = useState<string | null>(null);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // TODO. API 호출
    },
    [navigate]
  );

  return (
    <QuitBlock>
      <span className="material-icons">warning</span>
      <h2>경고문 어쩌구</h2>
      <h3>
        탈퇴를 원하시면 입력란에 <b>{user.email}</b>을 입력해주세요.
      </h3>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="quitEmail"
          placeholder="ex) travelmaker@google.com"
          onChange={(e) => {
            setQuitEamil(e.target.value);
          }}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SelectButtonStyle>
          {quitEmail === user.email ? (
            <CyanButtonStyle>
              <button type="submit">확인</button>
            </CyanButtonStyle>
          ) : (
            <GrayButtonStyle>
              <button>
                <LinkButton to="/set-profile">취소</LinkButton>
              </button>
            </GrayButtonStyle>
          )}
        </SelectButtonStyle>
      </form>
    </QuitBlock>
  );
};

export default Quit;
