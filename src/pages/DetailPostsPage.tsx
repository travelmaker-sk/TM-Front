import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Search from "../components/home/Search";
import Post from "../components/post/Post";
import { PostBlock } from "../components/post/PostList";
import { detailPosts } from "../lib/api/posts";
import { Wrapper } from "./HomePage";

const DetailPostsPage = () => {
  const location = useLocation();

  const [posts, setPosts] = useState<any[]>([]);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = useMemo(() => 16, []);

  useEffect(() => {
    // 0~15 16~31 ...
    const from = (currentPage - 1) * itemPerPage;

    // API 호출
    // @ts-ignore
    detailPosts(from, itemPerPage, location.state.category).then(
      // @ts-ignore
      ({ totalCount, list }) => {
        const totalPageCount = Math.ceil(totalCount / itemPerPage);
        setTotalPage(totalPageCount);
        setPosts(list);
      }
    );
    // @ts-ignore
  }, [currentPage, itemPerPage, location.state.category]);

  useEffect(() => {
    // render
  }, [totalPage]);

  return (
    <Wrapper>
      <Header />
      <Search />
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
