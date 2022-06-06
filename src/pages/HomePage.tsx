import React, { useEffect, useState } from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import Search from "../components/home/Search";
import { userInfo } from "../lib/api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import Header from "../components/common/Header";
import Swiper from "../components/home/Swiper";
import { AllPostsType } from "../lib/type";
import { listPosts } from "../lib/api/home";
import PostList from "../components/photocard/SearchPostList";
import Footer from "../components/common/Footer";
import HomePostList from "../components/photocard/HomePostList";

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

  const [homePosts, setHomePosts] = useState<AllPostsType>({
    popular: [],
    recent: [],
    place: [],
    store: [],
    lodging: [],
  });

  useEffect(() => {
    const loadHomePosts = () => {
      // API 호출
      listPosts()
        .then((res) => {
          // @ts-ignore
          setHomePosts(res);
        })
        .catch((err) => {
          console.warn(err);
        });
    };

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

    loadUser();
    loadHomePosts();
  }, [dispatch]);

  return (
    <Wrapper>
      <Header />
      <Search />
      <Swiper />
      <HomePostList list={homePosts.popular} category="popular" />
      <HomePostList list={homePosts.recent} category="recent" />
      <HomePostList list={homePosts.place} category="place" />
      <HomePostList list={homePosts.store} category="store" />
      <HomePostList list={homePosts.lodging} category="lodging" />
      <Footer />
    </Wrapper>
  );
};

export default HomePage;
