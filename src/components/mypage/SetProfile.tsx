import React, { useState } from "react";
import styled from "styled-components";
import {
  CyanButtonStyle,
  GrayButtonStyle,
  LinkButton,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import { ErrorMessage } from "../auth/Register";
import Input from "../common/Input";

interface SetProfileProps {
  user: {
    nickname: string;
    email: string;
    password: string;
  };
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  error: string | null;
}

const SetProfileBlock = styled.div`
  h2 {
    font-size: 24px;
    text-align: center;
  }
  h3 {
    margin: 52px 0 26px;
  }
  .thumbnail-upload {
    margin-bottom: 26px;
    display: flex;
    .thumbnail-name,
    label {
      height: 46.667px;
      padding: 10px 15px;
      border-radius: 4px;
    }
    .thumbnail-name {
      width: 75%;
      border: 1px solid ${palette.gray[4]};
      color: ${palette.gray[4]};
    }
    label {
      margin-left: 15px;
      width: 25%;
      border: 1px solid ${palette.gray[5]};
      cursor: pointer;
      text-align: center;
      line-height: 24px;
    }
    input[type="file"] {
      display: none;
    }
  }
`;

const SetProfile = ({ user, onSubmit, error }: SetProfileProps) => {
  const [newNickname, setNewNickname] = useState(user.nickname);
  const onChange = (e: any) => {
    setNewNickname(e.target.value);
  };
  return (
    <SetProfileBlock>
      <h2>회원정보 변경</h2>
      <form onSubmit={onSubmit}>
        <li>
          <h3>프로필 사진 변경</h3>
          <div className="thumbnail-upload">
            <input
              value="첨부파일"
              placeholder="첨부파일"
              className="thumbnail-name"
            />
            <label htmlFor="thumbnail">파일 선택</label>
            <input type="file" id="thumbnail" />
          </div>
          <SelectButtonStyle>
            <GrayButtonStyle>
              <button type="submit">파일 삭제</button>
            </GrayButtonStyle>
            <CyanButtonStyle>
              <button type="submit">저장</button>
            </CyanButtonStyle>
          </SelectButtonStyle>
        </li>
        <li>
          <h3>닉네임 변경</h3>
          <Input
            type="text"
            name="nickname"
            autoComplete="nickname"
            placeholder="닉네임"
            defaultValue={newNickname}
            onChange={onChange}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <CyanButtonStyle>
            <button type="submit">저장</button>
          </CyanButtonStyle>
        </li>
        <li>
          <h3>비밀번호 변경</h3>
          <Input
            type="password"
            name="old-password"
            autoComplete="current-password"
            placeholder="현재 비밀번호"
          />
          <Input
            type="password"
            name="new-password"
            autoComplete="new-password"
            placeholder="새 비밀번호"
          />
          <Input
            type="password"
            name="confirm-new-password"
            autoComplete="new-password"
            placeholder="새 비밀번호 확인"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <CyanButtonStyle>
            <button type="submit">저장</button>
          </CyanButtonStyle>
        </li>
      </form>
    </SetProfileBlock>
  );
};

export default SetProfile;
