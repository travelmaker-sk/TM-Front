import Post from "./Post";
import PostListTitle from "./PostListTitle";
import { useNavigate } from "react-router";
import {
  MoreButton,
  PostBlock,
  PostListBlock,
  PostListType,
} from "./SearchPostList";

const HomePostList = ({ list, category }: PostListType) => {
  const navigate = useNavigate();
  const onHomeMore = () => {
    navigate(`/more?category=${category}&sort=new&page=1`);
  };
  return (
    <PostListBlock>
      <PostListTitle category={category} />
      <PostBlock>
        {list.map((post) => (
          //@ts-ignore
          <Post post={post} key={post?.id} />
        ))}
      </PostBlock>
      <div className="more-btn-div">
        <MoreButton onClick={onHomeMore}>더보기</MoreButton>
      </div>
    </PostListBlock>
  );
};

export default HomePostList;
