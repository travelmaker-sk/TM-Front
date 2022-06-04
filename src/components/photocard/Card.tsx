import { GetPostType } from "../../lib/type";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useRef } from "react";

interface ICard {
  post: GetPostType | null;
  onOpenModal?: () => void;
}

export const CardStyle = styled.div`
  width: 23.875%;
  min-width: 238px;
  padding: 16px;
  // margin-bottom: 32px;
  background-color: white;
  border: 1.5px solid ${palette.gray[3]};
  cursor: pointer;
  font-size: 14px;
  li {
    display: flex;
    line-height: 1.2em;
    margin-bottom: 10px;
    img {
      margin-bottom: 16px;
    }
    span {
      width: 40px;
      color: ${palette.cyan[6]};
    }
  }
  .tag {
    margin-top: 32.333px;
    color: ${palette.gray[6]};
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
  const refCard = useRef<HTMLDivElement>(null);
  const cardWidth = refCard.current?.offsetWidth;

  return (
    <CardStyle
      ref={refCard}
      style={{ height: `calc(${cardWidth}*86/54)px` }}
      onClick={onOpenModal}
    >
      <li>
        <img
          src={post?.imageUrl ? post?.imageUrl : "./images/default-photo.png"}
          alt="PhotocardImage"
        />
      </li>
      <li>
        <span>이름</span>
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
      <li>
        <span>평점</span>
        {post?.score}
      </li>
      <li>
        <span>메모</span>
        {post?.memo}
      </li>
      <li className="tag">{post?.tagList?.map((item) => `#${item} `)}</li>
    </CardStyle>
  );
};

export default Card;
