import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect } from "react";
import { getPosts } from "../redux/posts";
import { useDispatch } from "react-redux";
import { postList } from "../lib/api/posts";

const PostPage = (props: any) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = location.search;
  const query = queryString.parse(searchParams);
  console.log(query);

  // API 호출
  const loadPosts = () => {
    // API 호출
    postList(query.where as string, query.what as string)
      .then((res) => {
        dispatch(getPosts({ posts: res }));
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div
      style={{
        fontSize: "30px",
      }}
    >
      {`/posts?where=${query.where}&what=${query.what}`} 페이지 입니다 😶‍🌫️
    </div>
  );
};

export default PostPage;
