import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Search from "../components/home/Search";
import Post from "../components/photocard/Post";
import { PostBlock } from "../components/photocard/SearchPostList";
import { SelectCategory } from "../components/write/CreateCard";
import { morePosts } from "../lib/api/home";
import palette from "../styles/palette";
import { Wrapper } from "./HomePage";
import queryString from "query-string";

const SelectSort = styled(SelectCategory)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  > span {
    margin: 0 5px;
    color: ${palette.gray[4]};
  }
  > button {
    padding: 0 5px;
    margin: 0 5px;
  }
`;

const MorePage = () => {
  const location = useLocation();
  const searchParams = location.search;
  const query = queryString.parse(searchParams);

  const [posts, setPosts] = useState<any[]>([]);

  // 정렬 select
  const [sort, setSort] = useState("new");

  useEffect(() => {
    if (sort === "new") {
      setSort("new");
    }
    if (sort === "old") {
      setSort("old");
    }
    if (sort === "popular") {
      setSort("popular");
    }
  }, [sort]);

  // 정렬 선택
  const onSelectedSort = useCallback((e: any) => {
    setSort(e.target.value);
  }, []);

  // 페이지네이션
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = useMemo(() => 16, []);

  useEffect(() => {
    // API 호출
    //@ts-ignore
    morePosts(
      query.category as string,
      sort as string,
      currentPage,
      query.where as string,
      query.what as string
    )
      .then(({ totalCount, list }) => {
        const totalPageCount = Math.ceil(totalCount / itemPerPage);
        setTotalPage(totalPageCount);
        setPosts(list);
      })
      .catch((err) => {
        console.warn(err);
      });
    console.log("search", sort, currentPage);
  }, [currentPage, itemPerPage, query.category, query.what, query.where, sort]);

  return (
    <Wrapper>
      <Header />
      <Search />
      <SelectSort>
        <div>
          <select
            name="sort"
            className="select"
            onChange={onSelectedSort}
            defaultValue="new"
          >
            <option value="new">최신순</option>
            <option value="old">오래된순</option>
            <option value="popular">인기순</option>
          </select>
        </div>
      </SelectSort>
      <PostBlock>
        {posts.map((post) => (
          //@ts-ignore
          <Post post={post} key={post?.id} />
        ))}
      </PostBlock>
      <Pagination>
        <span className="material-icons">chevron_left</span>
        {Array.from({ length: totalPage }, (x, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => {
                setCurrentPage(pageNumber);
                console.log(pageNumber);
              }}
              style={
                currentPage === pageNumber
                  ? { color: palette.cyan[5], fontWeight: 700 }
                  : {}
              }
            >
              {pageNumber}
            </button>
          )
        )}
        <span className="material-icons">chevron_right</span>
      </Pagination>
      <Footer />
    </Wrapper>
  );
};

export default MorePage;
