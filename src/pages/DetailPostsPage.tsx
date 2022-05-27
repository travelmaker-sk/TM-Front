import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { detailPosts } from "../lib/api/posts";

const DetailPostsPage = () => {
  const location = useLocation();

  const [list, setList] = useState<any[]>([]);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = useMemo(() => 16, []);

  useEffect(() => {
    // 0~15 16~31 ...
    const from = (currentPage - 1) * itemPerPage;

    // API 호출
    //@ts-ignore
    detailPosts(from, itemPerPage, location.state.category).then(
      ({ totalCount, list }) => {
        const totalPageCount = Math.ceil(totalCount / itemPerPage);
        setTotalPage(totalPageCount);
        setList(list);
      }
    );
    // @ts-ignore
  }, [currentPage, itemPerPage, location.state.category]);

  useEffect(() => {
    // render
  }, [totalPage]);

  return (
    <div>
      {list.map((post) => (
        <div key={post.id}>포토카드</div>
      ))}
      {Array.from({ length: totalPage }, (x, i) => i + 1).map((pageNumber) => (
        <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default DetailPostsPage;
