import Post from "./Post";
import PostListTitle from "./PostListTitle";
import { LinkButton } from "../../styles/ButtonStyle";

interface PostListType {
  list: any[];
  category: string;
}
const PostList = ({ list, category }: PostListType) => {
  return (
    <>
      <PostListTitle />
      {list.map((post) => (
        //@ts-ignore
        <Post post={post} key={post?.id} />
      ))}
      <LinkButton to="/detailPosts" state={{ category }}>
        더보기
      </LinkButton>
    </>
  );
};

export default PostList;
