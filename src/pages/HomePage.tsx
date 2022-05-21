import React, { useEffect, useState } from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import Search from "../components/home/Search";
import { userInfo } from "../lib/api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import Header from "../components/common/Header";
import { CardType } from "../lib/type";

export const Wrapper = styled(Responsive)`
  .post-list {
    font-size: 20px;
    // Mobile
    @media screen and (max-width: 767px) {
      font-size: 18px;
    }
  }
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const loadUser = () => {
    let token = localStorage.getItem("tm-token");

    if (!token) return;

    // API 호출
    userInfo(token as string)
      .then((res) => {
        dispatch(setUser({ user: res }));
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Wrapper>
      <Header />
      <Search />
      <div className="post-list">다른 사람들의 여행을 둘러보세요</div>
    </Wrapper>
  );
};

export default HomePage;
