import { AccomCardType, PlaceCardType, RestCardType } from "../../lib/type";

export interface PostType {
  post: PlaceCardType | RestCardType | AccomCardType | null;
}

const Post = ({ post }: PostType) => {
  return (
    <div style={{ marginBottom: "32px" }}>
      카테고리: {post?.category}
      <br />
      타이틀: {post?.title}
    </div>
  );
};

export default Post;
