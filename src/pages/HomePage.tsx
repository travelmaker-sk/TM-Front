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
import AllPosts from "../components/photocard/PostList";
import { allPosts } from "../lib/api/post";
import PostList from "../components/photocard/PostList";
import Footer from "../components/common/Footer";

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
    restaurant: [],
    accommodation: [],
  });

  useEffect(() => {
    const loadHomePosts = () => {
      // API 호출
      allPosts(4)
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
      <PostList list={homePosts.popular} category="popular" />
      <PostList list={homePosts.recent} category="recent" />
      <PostList list={homePosts.place} category="place" />
      <PostList list={homePosts.restaurant} category="restaurant" />
      <PostList list={homePosts.accommodation} category="accommodation" />
      <Footer />
    </Wrapper>
  );
};

export default HomePage;
