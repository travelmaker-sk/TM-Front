import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { listPosts } from "../lib/api/post";
import { AllPostsType } from "../lib/type";
import { Wrapper } from "./HomePage";
import Header from "../components/common/Header";
import Search from "../components/home/Search";
import styled from "styled-components";
import palette from "../styles/palette";
import Footer from "../components/common/Footer";
import SearchPostList from "../components/photocard/SearchPostList";
import { useNavigate } from "react-router";

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

const SearchPage = (props: any) => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = location.search;
  const query = queryString.parse(searchParams);

  const [posts, setposts] = useState<AllPostsType>({
    popular: [],
    recent: [],
    place: [],
    restaurant: [],
    accommodation: [],
  });

  useEffect(() => {
    // API 호출
    listPosts(query.where as string, query.what as string)
      .then((list) => {
        // @ts-ignore
        setposts(list);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [query.what, query.where]);

  return (
    <Wrapper>
      <Header />
      <Search />
      <SearchTitle>
        <h2 className="bounce">{query.where}</h2>
        <h3>
          {query.where ?? "전 지역"}
          &nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;
          {query.what ?? "전체"}
        </h3>
      </SearchTitle>
      <SearchPostList
        list={posts.popular}
        category="popular"
        where={query.where}
        what={query.what}
      />
      <SearchPostList
        list={posts.recent}
        category="recent"
        where={query.where}
        what={query.what}
      />
      <SearchPostList
        list={posts.place}
        category="place"
        where={query.where}
        what={query.what}
      />
      <SearchPostList
        list={posts.restaurant}
        category="restaurant"
        where={query.where}
        what={query.what}
      />
      <SearchPostList
        list={posts.accommodation}
        category="accommodation"
        where={query.where}
        what={query.what}
      />
      <Footer />
    </Wrapper>
  );
};

export default SearchPage;
