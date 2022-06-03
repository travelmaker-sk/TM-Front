import { useMemo, useRef } from "react";
import styled from "styled-components";
import { AllPostsCategoryType } from "../../lib/type";
import palette from "../../styles/palette";

export interface PostListTitleType {
  category: AllPostsCategoryType;
}

const PostListTitleStyle = styled.div`
  margin-bottom: 32px;
  span {
    display: block;
    margin-bottom: 32px;
    font-size: 20px;
  }
  hr {
    border: none;
    background-color: ${palette.gray[3]};
    height: 1.5px;
  }
`;

const PostListTitle = ({ category }: PostListTitleType) => {
  const dictCategory = useMemo(
    () => ({
      popular: "인기 포토카드",
      recent: "최신 포토카드",
      place: "가볼 만한 곳",
      restaurant: "맛집",
      accommodation: "숙소",
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
