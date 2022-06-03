import Post from "./Post";
import PostListTitle from "./PostListTitle";
import styled from "styled-components";
import palette from "../../styles/palette";
import { AllPostsCategoryType } from "../../lib/type";
import { useNavigate } from "react-router";

export interface PostListType {
  list: any[];
  category: AllPostsCategoryType;
  where?: any;
  what?: any;
}

export const PostListBlock = styled.div`
  margin-bottom: 64px;
  .more-btn-div {
    display: flex;
    justify-content: center;
  }
`;

export const PostBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  > *:nth-of-type(odd) {
    margin-right: 1.5%;
    transition: 0.5s;
  }
  > *:nth-of-type(odd):hover {
    transform: translateY(-15px);
  }
  // 7, 15 ...
  > *:nth-of-type(8n-1) {
    margin-right: 0;
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    > *:nth-of-type(8n-1) {
      margin-right: 1.5%;
    }
    // 5, 11 ...
    > *:nth-of-type(6n-1) {
      margin-right: 0;
    }
  }
  // Mobile
  @media screen and (max-width: 767px) {
    > * {
      margin-right: 0;
    }
  }
`;

export const MoreButton = styled.button`
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
`;

const SearchPostList = ({ list, category, where, what }: PostListType) => {
  const navigate = useNavigate();
  const onDetailMore = () => {
    navigate(
      `/more?where=${where}&what=${what}&category=${category}&sort=new&page=1`
    );
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
        <MoreButton onClick={onDetailMore}>더보기</MoreButton>
      </div>
    </PostListBlock>
  );
};

export default SearchPostList;
