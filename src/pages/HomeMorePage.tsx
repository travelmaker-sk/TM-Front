import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Search from "../components/home/Search";
import Post from "../components/photocard/Post";
import { PostBlock } from "../components/photocard/SearchPostList";
import { SelectCategory } from "../components/write/CreateCard";
import { detailPosts } from "../lib/api/post";
import palette from "../styles/palette";
import { Wrapper } from "./HomePage";
import queryString from "query-string";
import { useNavigate } from "react-router";

const SelectSort = styled(SelectCategory)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  > span {
    margin: 0 5px;
    color: ${palette.gray[4]};
  }
  > button {
    padding: 0 5px;
    margin: 0 5px;
  }
`;

const HomeMorePage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = location.search;
  const query = queryString.parse(searchParams);

  const [posts, setPosts] = useState<any[]>([]);

  // 정렬 select
  const [sort, setSort] = useState(query.sort);

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
  const numCurrentPage = Number(query.page);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(numCurrentPage);

  const itemPerPage = useMemo(() => 16, []);

  useEffect(() => {
    // 0~15 16~31 ...
    // const from = (currentPage - 1) * itemPerPage;

    // API 호출
    detailPosts(query.category as string, sort as string, currentPage).then(
      ({ totalCount, list }) => {
        const totalPageCount = Math.ceil(totalCount / itemPerPage);
        setTotalPage(totalPageCount);
        setPosts(list);
      }
    );
    console.log(sort, currentPage);
  }, [currentPage, itemPerPage, navigate, query.category, sort]);

  useEffect(() => {
    // render
  }, [totalPage]);

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

export default HomeMorePage;
