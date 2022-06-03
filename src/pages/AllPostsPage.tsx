import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { allPosts } from "../lib/api/post";
import { AllPostsType } from "../lib/type";
import PostList from "../components/photocard/PostList";
import { Wrapper } from "./HomePage";
import Header from "../components/common/Header";
import Search from "../components/home/Search";
import styled from "styled-components";
import palette from "../styles/palette";
import Footer from "../components/common/Footer";

const SearchTitle = styled.div`
  h2 {
    color: ${palette.cyan[7]};
    font-size: 40px;
    font-weight: 700;
    margin: 32px 0;
    position: relative;
    animation: txtup 0.5s infinite;
    -webkit-animation: txtup 1s infinite;
    -ms-animation: txtup 0.5s infinite;
    -moz-animation: txtup 0.5s infinite;

    @-webkit-keyframes txtup {
      0% {
        top: 0;
      }
      20% {
        top: -0.2rem;
      }
      40% {
        top: 0;
      }
      60% {
        top: 0;
      }
      80% {
        top: 0;
      }
      100% {
        top: 0;
      }
    }
    @keyframes txtup {
      0% {
        top: 0;
      }
      20% {
        top: -0.2rem;
      }
      40% {
        top: 0;
      }
      60% {
        top: 0;
      }
      80% {
        top: 0;
      }
      100% {
        top: 0;
      }
    }
  }
  h3 {
    font-size: 14px;
    color: ${palette.gray[6]};
    margin-bottom: 64px;
  }
`;

const AllPostsPage = (props: any) => {
  const location = useLocation();
  const searchParams = location.search;
  const query = queryString.parse(searchParams);
  console.log(query);

  const [posts, setposts] = useState<AllPostsType>({
    popular: [],
    recent: [],
    place: [],
    restaurant: [],
    accommodation: [],
  });

  useEffect(() => {
    // API 호출
    const loadPosts = () => {
      // API 호출
      allPosts(query.where as string, query.what as string)
        .then((list) => {
          // @ts-ignore
          setposts(list);
        })
        .catch((err) => {
          console.warn(err);
        });
    };

    loadPosts();
  }, [query.what, query.where]);

  return (
    <Wrapper>
      <Header />
      <Search />
      <SearchTitle>
        <h2 className="bounce">{query.where}</h2>
        <h3>
          {query.where ? query.where : "전 지역"}
          &nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;
          {query.what ? query.what : "전체"}
        </h3>
      </SearchTitle>
      <PostList list={posts.popular} category="popular" />
      <PostList list={posts.recent} category="recent" />
      <PostList list={posts.place} category="place" />
      <PostList list={posts.restaurant} category="restaurant" />
      <PostList list={posts.accommodation} category="accommodation" />
      <Footer />
    </Wrapper>
  );
};

export default AllPostsPage;
