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
import { useNavigate } from "react-router";
import Loading from "../components/common/Loading";

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
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.search;
  const query = queryString.parse(searchParams);

  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState<any[]>([]);

  // 정렬
  const [sort, setSort] = useState("id,desc");

  useEffect(() => {
    if (sort === "id,desc") {
      setSort("id,desc");
    }
    if (sort === "id,asc") {
      setSort("id,asc");
    }
    if (sort === "viewcount,desc") {
      setSort("viewcount,desc");
    }
  }, [sort]);

  // 정렬 선택
  const onSelectedSort = useCallback((e: any) => {
    setSort(e.target.value);
  }, []);

  // 페이지네이션
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(true);

    // API 호출
    morePosts(
      query.category as string,
      sort,
      currentPage,
      query.location as string,
      query.tag as string
    )
      .then((res) => {
        console.log("morePosts", res);
        setTotalPage(res.totalPages);
        setPosts(res.content);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, navigate, query.category, query.tag, query.location, sort]);

  return (
    <>
      <Wrapper>
        <Header />
        <Search />
        <SelectSort>
          <div>
            <select
              name="sort"
              className="select"
              onChange={onSelectedSort}
              defaultValue="id,desc"
            >
              <option value="id,desc">최신순</option>
              <option value="id,asc">오래된순</option>
              <option value="viewcount,desc">인기순</option>
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
                  setCurrentPage(pageNumber - 1);
                }}
                style={
                  currentPage === pageNumber - 1
                    ? { color: palette.cyan[4], fontWeight: 700 }
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
      {loading ? <Loading /> : ""}
    </>
  );
};

export default MorePage;
