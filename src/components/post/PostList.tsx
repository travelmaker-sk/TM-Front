import Post from "./Post";
import PostListTitle from "./PostListTitle";
import styled from "styled-components";
import palette from "../../styles/palette";
import { Link } from "react-router-dom";

interface PostListType {
  list: any[];
  category: string;
}

const PostListBlock = styled.div`
  margin-bottom: 64px;
  .more-btn-div {
    display: flex;
    justify-content: center;
  }
`;

export const PostBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    margin-right: 1.5%;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    > * {
      margin-right: 0;
    }
  }
`;

const MoreButton = styled(Link)`
  > button {
    padding: 8px 25px;
    color: #fff;
    background: ${palette.cyan[7]};
    &:hover {
      background: ${palette.cyan[6]};
    }
    &:active {
      background: ${palette.cyan[8]};
    }
    border-radius: 3px;
    cursor: pointer;
  }
`;

const PostList = ({ list, category }: PostListType) => {
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
        <MoreButton to="/detailPosts" state={{ category }}>
          <button>더보기</button>
        </MoreButton>
      </div>
    </PostListBlock>
  );
};

export default PostList;
