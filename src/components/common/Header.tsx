import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import palette from "../../styles/palette";
import { Link } from "react-router-dom";

type HeaderProps = {
  user: {
    nickname: string;
    username: string;
    password: string;
  } | null;
  onLogout: () => void;
};

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  border-bottom: 1px solid ${palette.gray[2]};
`;

const HeaderBlock = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-info {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .link-btn {
      text-decoration: underline;
    }
  }
`;

const UserName = styled.div`
  margin-left: 10px;
`;

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <Wrapper>
      <HeaderBlock>
        <Logo />
        {user ? (
          <div className="right">
            <span className="user-info">
              <img src="./images/default_profile.png" alt="profileImage" />
              <UserName>반가워요, {user.nickname} 님!</UserName>
            </span>
            <button className="link-btn" onClick={onLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <div className="right">
            <Link to="/login" className="link-btn">
              로그인
            </Link>
          </div>
        )}
      </HeaderBlock>
    </Wrapper>
  );
};

export default Header;
