import { useMemo } from "react";
import styled from "styled-components";
import { AllPostsCategoryType } from "../../lib/type/post";
import palette from "../../styles/palette";

export interface PostListTitleType {
  category: AllPostsCategoryType;
}

const PostListTitleStyle = styled.div`
  margin-bottom: 40px;
  span {
    display: block;
    margin-bottom: 40px;
    color: ${palette.cyan[8]};
    font-size: 24px;
    font-family: "Do Hyeon", sans-serif;
  }
  hr {
    border-top: 1.3px splid ${palette.gray[5]};
    border-bottom: none;
  }
`;

const PostListTitle = ({ category }: PostListTitleType) => {
  const dictCategory = useMemo(
    () => ({
      popular: "인기 포토카드",
      recent: "최신 포토카드",
      place: "가볼 만한 곳",
      store: "맛집",
      lodging: "숙소",
    }),
    []
  );

  return (
    <>
      <PostListTitleStyle>
        <span>{dictCategory[category]}</span>
        <hr />
      </PostListTitleStyle>
    </>
  );
};

export default PostListTitle;
