import { useRef } from "react";
import styled from "styled-components";
import { AllPostsType } from "../../lib/type";
import palette from "../../styles/palette";

export interface CategoryType {
  category: string;
}

const PostListTitleStyle = styled.div`
  margin-bottom: 32px;
  span {
    font-size: 20px;
    display: block;
    margin-bottom: 32px;
  }
  hr {
    border: none;
    background-color: ${palette.gray[3]};
    height: 1.5px;
  }
`;

const PostListTitle = ({ category }: CategoryType) => {
  const refListTitle = useRef<HTMLSpanElement>(null);

  // switch (category) {
  //   case "popular":
  //     if (!refListTitle.current) return;
  //     refListTitle.current.innerHTML = "인기 포토카드";
  //     break;
  //   case "recent":
  //     if (!refListTitle.current) return;
  //     refListTitle.current.innerHTML = "최신 포토카드";
  //     break;
  //   case "place":
  //     if (!refListTitle.current) return;
  //     refListTitle.current.innerHTML = "가볼 만한 곳";
  //     break;
  //   case "restaurant":
  //     if (!refListTitle.current) return;
  //     refListTitle.current.innerHTML = "맛집";
  //     break;
  //   case "accommodation":
  //     if (!refListTitle.current) return;
  //     refListTitle.current.innerHTML = "숙소";
  //     break;
  // }

  return (
    <>
      <PostListTitleStyle>
        <span ref={refListTitle}>{category}</span>
        <hr />
      </PostListTitleStyle>
    </>
  );
};

export default PostListTitle;
