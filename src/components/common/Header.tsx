import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import palette from "../../styles/palette";
import { Link } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import { UserType } from "../../lib/type";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  border-bottom: 1px solid ${palette.gray[2]};
  z-index: 7777;
`;

const HeaderBlock = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 25px 3%;
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
      // margin-right: 20px;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        // Mobile
        @media screen and (max-width: 767px) {
          width: 20px;
          height: 20px;
        }
      }
    }
    .login-btn {
      padding: 8px 15px;
      border: 1.3px solid ${palette.gray[5]};
      color: ${palette.gray[6]};
      &:hover {
        border-color: ${palette.cyan[8]};
        color: ${palette.cyan[8]};
      }
      border-radius: 3px;
      cursor: pointer;
    }
  }

  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    width: 100%;
    padding: 20px 5%;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 15px 5%;
    }
  }
`;

const UserName = styled.div`
  margin-left: 10px;
  // Mobile
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const HeaderBottom = styled.div`
  height: 90px;
  // Mobile
  @media screen and (max-width: 767px) {
    height: 75.333px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem("tm-token");
    navigate("/");
  }, [dispatch, navigate]);

  const { user } = useSelector((state: RootStateOrAny) => state.user);

  return (
    <>
      <Wrapper>
        <HeaderBlock>
          <Logo fontsize="16px" />
          {user ? (
            <div className="right">
              <span className="user-info">
                <img
                  src={
                    user.profileImage
                      ? user.profileImage
                      : "./images/default-profile.png"
                  }
                  alt="ProfileImage"
                />
                <UserName>반가워요, {user.username} 님!</UserName>
              </span>
              <HeaderMenu onLogout={onLogout} />
            </div>
          ) : (
            <div className="right">
              <Link to="/login" className="login-btn">
                로그인
              </Link>
            </div>
          )}
        </HeaderBlock>
      </Wrapper>
      <HeaderBottom />
    </>
  );
};

export default Header;
