import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";
import Logo from "./Logo";

type HeaderProps = {
  user: any;
  onLogout: () => void;
};

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
`;

const Wrapper = styled(Responsive)`
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    display: flex;
    align-items: center;
  }
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
        <Wrapper>
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
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
