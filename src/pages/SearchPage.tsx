import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { listPosts } from "../lib/api/home";
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
    margin-bottom: 80px;
  }
`;

const SearchPage = (props: any) => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = location.search;
  const query = queryString.parse(searchParams);

  const [searchPosts, setSearchPosts] = useState<AllPostsType>({
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
    // API 호출
    listPosts(query.location as string, query.tag as string)
      .then((res) => {
        setSearchPosts(res);
        console.log("searchPosts", res);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [navigate, query.tag, query.location]);

  return (
    <Wrapper>
      <Header />
      <Search />
      <SearchTitle>
        <h2 className="bounce">{query.location}</h2>
        <h3>
          {query.location ?? "전 지역"}
          &nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;
          {query.tag ?? "전체"}
        </h3>
      </SearchTitle>
      {/* <SearchPostList
        list={posts.popularList.content}
        category="popular"
        location={query.location}
        tag={query.tag}
      /> */}
      <SearchPostList
        list={searchPosts.recentList.content}
        category="recent"
        location={query.location}
        tag={query.tag}
      />
      <SearchPostList
        list={searchPosts.placeList.content}
        category="place"
        location={query.location}
        tag={query.tag}
      />
      <SearchPostList
        list={searchPosts.storeList.content}
        category="store"
        location={query.location}
        tag={query.tag}
      />
      <SearchPostList
        list={searchPosts.lodgingList.content}
        category="lodging"
        location={query.location}
        tag={query.tag}
      />
      <Footer />
    </Wrapper>
  );
};

export default SearchPage;
