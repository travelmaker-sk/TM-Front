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
import { UserType } from "../../lib/type";
import { quit } from "../../lib/api/auth";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import Loading from "../common/Loading";

interface QuitType {
  user: UserType;
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
      font-weight: 700;
    }
  }
  Input {
    margin-bottom: 52px;
  }
`;

const Quit = ({ user }: QuitType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [quitEmail, setQuitEamil] = useState<string | null>(null);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoading(true);

      // API 호출
      quit()
        .then((res) => {
          if (res) {
            setError("탈퇴하기 실패");
            return;
          } else {
            setError("");
            dispatch(logout());
            localStorage.removeItem("tm-token");
            navigate("/quitFin");
          }
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch, navigate]
  );

  return (
    <>
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
                  <LinkButton to="/setProfile">취소</LinkButton>
                </button>
              </GrayButtonStyle>
            )}
          </SelectButtonStyle>
        </form>
      </QuitBlock>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default Quit;
