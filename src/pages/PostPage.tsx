import { useLocation } from "react-router-dom";
import queryString from "query-string";

const PostPage = (props: any) => {
  const location = useLocation();
  const searchParams = location.search;
  const query = queryString.parse(searchParams);

  console.log(query);

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
