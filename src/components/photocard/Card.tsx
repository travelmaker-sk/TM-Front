import { GetPostType } from "../../lib/type";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useEffect, useMemo, useRef } from "react";

interface ICard {
  post: GetPostType | null;
  onOpenModal?: () => void;
}

export const CardUl = styled.ul`
  width: 23.875%;
  min-width: 238px;
  padding: 16px;
  margin-bottom: 40px;
  background-color: white;
  border: 1.5px solid ${palette.gray[3]};
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  li {
    display: flex;
    line-height: 1.2em;
    margin-bottom: 10px;
    img {
      aspect-ratio: 4/3;
      object-fit: cover;
      margin-bottom: 20px;
    }
    span {
      width: 40px;
      color: ${palette.cyan[5]};
    }
  }
  .score > p {
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
  .tagList {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .tag {
    margin: 0 5px 0 0;
    padding: 5px 7px;
    background-color: ${palette.cyan[7]};
    border-radius: 4px;
    color: white;
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    width: 30%;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Card = ({ post, onOpenModal }: ICard) => {
  const refCard = useRef<HTMLUListElement>(null);
  const cardWidth = refCard.current?.offsetWidth;

  const dictScore = useMemo(
    () => ({
      1: "⭐",
      2: "⭐⭐",
      3: "⭐⭐⭐",
      4: "⭐⭐⭐⭐",
      5: "⭐⭐⭐⭐⭐",
    }),
    []
  );

  console.log("imageUrl", post?.image);

  return (
    <CardUl
      ref={refCard}
      style={{ height: `calc(${cardWidth}*86/54)px` }}
      onClick={onOpenModal}
    >
      <li>
        <img
          src={
            post?.image
              ? `C:\Temp\spring\project\${post.image}`
              : "./images/default-photo.png"
          }
          alt="PhotocardImage"
        />
      </li>
      <li>
        <span>제목</span>
        {post?.title}
      </li>
      <li>
        <span>위치</span>
        {post?.location}
      </li>
      <li>
        <span>날짜</span>
        {post?.date}
      </li>
      {post?.weather ? (
        <li>
          <span>날씨</span>
          {post?.weather}
        </li>
      ) : (
        ""
      )}
      {post?.menu ? (
        <li>
          <span>메뉴</span>
          {post?.menu}
        </li>
      ) : (
        ""
      )}
      {post?.price ? (
        <li>
          <span>가격</span>
          {post?.price}
        </li>
      ) : (
        ""
      )}
      <li className="score">
        <span>평점</span>
        <p>
          {/* @ts-ignore */}
          {dictScore[post?.score]}
        </p>
      </li>
      <li>
        <span>메모</span>
        {post?.memo}
      </li>
      <li className="tagList">
        {post?.tagList?.map((item) => (
          <li className="tag">{`# ${item}`}</li>
        ))}
      </li>
    </CardUl>
  );
};

export default Card;
