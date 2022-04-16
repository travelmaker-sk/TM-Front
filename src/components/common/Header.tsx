import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Button from "./Button";

type HeaderProps = {
  user: {
    nickname: string;
    email: string;
    password: string;
  };
  onLogout: () => void;
};

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Spacer = styled.div`
  height: 5rem;
`;

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <>
      <HeaderBlock>
        <Logo />
        {user ? (
          <div className="right">
            <UserInfo>{user.nickname}</UserInfo>
            <Button onClick={onLogout}>로그아웃</Button>
          </div>
        ) : (
          <div className="right">
            <Button to="/login">로그인</Button>
          </div>
        )}
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
