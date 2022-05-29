import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Search from "../components/home/Search";
import Post from "../components/photocard/Post";
import { PostBlock } from "../components/photocard/PostList";
import { SelectCategory } from "../components/write/CreateCard";
import { detailPosts } from "../lib/api/post";
import { Wrapper } from "./HomePage";

const SelectSort = styled(SelectCategory)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

const DetailPostsPage = () => {
  const location = useLocation();

  const [posts, setPosts] = useState<any[]>([]);

  // 정렬 select
  const [sort, setSort] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  console.log("selected ", selectedSort);
  console.log("sort", sort);

  // 정렬 선택
  const onSelectedSort = (e: any) => {
    setSelectedSort(e.target.value);

    if (selectedSort === "new") {
      setSort("new");
    }
    if (selectedSort === "old") {
      setSort("old");
    }
    if (selectedSort === "popular") {
      setSort("popular");
    }
  };

  // 페이지네이션
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = useMemo(() => 16, []);

  useEffect(() => {
    // 0~15 16~31 ...
    const from = (currentPage - 1) * itemPerPage;

    // API 호출
    //@ts-ignore
    detailPosts(from, itemPerPage, location.state.category, sort).then(
      ({ totalCount, list }) => {
        const totalPageCount = Math.ceil(totalCount / itemPerPage);
        setTotalPage(totalPageCount);
        setPosts(list);
      }
    );
    // @ts-ignore
  }, [currentPage, itemPerPage, location.state.category, sort]);

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
      {Array.from({ length: totalPage }, (x, i) => i + 1).map((pageNumber) => (
        <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      <Footer />
    </Wrapper>
  );
};

export default DetailPostsPage;
