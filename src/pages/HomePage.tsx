import React, { useEffect, useState } from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import Search from "../components/home/Search";
import { userInfo } from "../lib/api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import Header from "../components/common/Header";
import Swiper from "../components/home/Swiper";
import { AllPostsType, PostType } from "../lib/type";
import { listPosts, loadPost } from "../lib/api/home";
import PostList from "../components/photocard/SearchPostList";
import Footer from "../components/common/Footer";
import HomePostList from "../components/photocard/HomePostList";
import Post from "../components/photocard/Post";
import { useNavigate } from "react-router";
import Loading from "../components/common/Loading";
import ScrollToTopButton from "../components/common/scrollToTopButton";

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
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [testPost, setTestPost] = useState(null);

  const [homePosts, setHomePosts] = useState<AllPostsType>({
    popularList: {
      content: [],
    },
    recentList: {
      content: [],
    },
    placeList: {
      content: [],
    },
    storeList: {
      content: [],
    },
    lodgingList: {
      content: [],
    },
  });

  useEffect(() => {
    // 포스트 리스트 출력
    const loadHomePosts = () => {
      setLoading(true);

      // API 호출
      listPosts()
        .then((res) => {
          setHomePosts(res);
          console.log("homePosts", res);
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    // 유저 확인
    const loadUser = () => {
      let token = localStorage.getItem("tm-token");
      if (!token) return;

      // API 호출
      userInfo()
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
    <>
      <Wrapper>
        <Header />
        <Search />
        <Swiper />
        <HomePostList list={homePosts.popularList.content} category="popular" />
        <HomePostList list={homePosts.recentList.content} category="recent" />
        <HomePostList list={homePosts.placeList.content} category="place" />
        <HomePostList list={homePosts.storeList.content} category="store" />
        <HomePostList list={homePosts.lodgingList.content} category="lodging" />
        <Footer />
        <ScrollToTopButton />
      </Wrapper>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default HomePage;
