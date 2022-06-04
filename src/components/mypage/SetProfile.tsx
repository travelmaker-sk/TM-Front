import React, { useCallback, useState } from "react";
import styled from "styled-components";
import {
  CyanButtonStyle,
  GrayButtonStyle,
  LinkButton,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import { UserType } from "../../lib/type";
import { ErrorMessage } from "../auth/Register";
import Input from "../common/Input";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface SetProfileType {
  user: UserType;
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
    font-weight: 600;
  }
  img {
    margin: 0 auto 26px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .profileImage-upload {
    margin-bottom: 26px;
    display: flex;
    .profileImage-name,
    label {
      height: 46.667px;
      padding: 10px 15px;
      border-radius: 4px;
    }
    .profileImage-name {
      width: 75%;
      border: 1px solid ${palette.gray[4]};
      color: ${palette.gray[4]};
    }
    label {
      margin-left: 15px;
      width: 25%;
      border: 1px solid ${palette.gray[4]};
      cursor: pointer;
      text-align: center;
      line-height: 24px;
    }
    input[type="file"] {
      display: none;
    }
  }
`;

const QuitLinkButton = styled(LinkButton)`
  position: fixed;
  bottom: 5%;
  right: 17.7%;
  text-align: right;
  text-decoration: underline;
  color: ${palette.gray[5]};
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    right: 15.2%;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    right: 7.7%;
  }
`;

const SetProfile = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: RootStateOrAny) => state.user);

  const [newNickname, setNewNickname] = useState(user.username);

  // 프로필 사진 미리보기
  const [image, setImage] = useState({
    profileImageFile: "",
    profileImageUrl: user.profileImage ?? "./images/default-profile.png",
  });
  const profileImageChange = (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        profileImageFile: e.target.files[0].name,
        //@ts-ignore
        profileImageUrl: fileReader.result,
      });
    };
  };
  const profileImageDel = () => {
    setImage({
      profileImageFile: "",
      profileImageUrl: "./images/default-profile.png",
    });
  };

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO. API 호출
  }, []);

  return (
    <SetProfileBlock>
      <h2>회원정보 설정</h2>
      <form onSubmit={onSubmit}>
        <li>
          <h3>프로필 사진 변경</h3>
          <img src={image.profileImageUrl} alt="프로필 이미지" />
          <div className="profileImage-upload">
            <input
              placeholder={image.profileImageFile ?? "첨부파일"}
              className="profileImage-name"
              readOnly
            />
            <label htmlFor="profileImage">파일 선택</label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={profileImageChange}
            />
          </div>
          <SelectButtonStyle>
            <GrayButtonStyle>
              <button onClick={profileImageDel}>삭제</button>
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
            name="username"
            autoComplete="username"
            placeholder="닉네임"
            defaultValue={newNickname}
            onChange={(e) => {
              setNewNickname(e.target.value);
            }}
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
      <QuitLinkButton to="/quit">탈퇴하기</QuitLinkButton>
    </SetProfileBlock>
  );
};

export default SetProfile;
