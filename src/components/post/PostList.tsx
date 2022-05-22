import { RootStateOrAny, useSelector } from "react-redux";
import { PlaceCardType, RestCardType, AccomCardType } from "../../lib/type";
import Post from "./Post";
import PostListTitle from "./PostListTitle";
import postsData from "../postsData.json";

const PostList = () => {
  const { posts } = useSelector((state: RootStateOrAny) => state.posts);

  return (
    <>
      <PostListTitle />
      {/* {posts.map(
        (post: PlaceCardType | RestCardType | AccomCardType | null) => (
          <Post post={post} key={post?.id} />
        )
      )} */}
      {postsData.postList.map((post) => (
        //@ts-ignore
        <Post post={post} key={post?.id} />
      ))}
    </>
  );
};

export default PostList;
