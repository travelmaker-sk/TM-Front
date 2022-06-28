import { GetPostType } from "../../lib/type";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useEffect, useMemo, useRef } from "react";
import React, { useState } from "react";

interface ICard {
  post: GetPostType | null;
  onOpenModal?: () => void;
  my?: boolean;
  bookmark?: boolean;
}

const PrintCardUl = styled.ul`
  width: 204px;
  height: 325px;
  min-height: 325px;
  padding: 15px;
  border: 1.5px solid ${palette.gray[0]};
  cursor: pointer;
  font-size: 10px;
  background-color: white;
  li {
    display: flex;
    line-height: 1.2em;
    margin-bottom: 5px;
    img {
      aspect-ratio: 4/3;
      object-fit: cover;
      margin-bottom: 10px;
    }
    span {
      width: 35px;
      color: ${palette.cyan[5]};
    }
  }
  .score > p {
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
  .tagList {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .tag {
    margin: 0 5px 0 0;
    padding: 5px;
    background-color: ${palette.cyan[5]};
    border-radius: 4px;
    color: white;
  }

  // Mobile
  @media screen and (max-width: 767px) {
    width: 243px;
    height: 473px;
    min-height: 473px;
    margin: 0 auto;
  }
`;

export const CardUl = styled.ul`
  width: 23.875%;
  min-height: 521px;
  padding: 15px;
  margin-bottom: 40px;
  cursor: pointer;
  font-size: 14px;
  border: 1.5px solid ${palette.gray[3]};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  background-color: white;
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
    background-color: ${palette.cyan[5]};
    border-radius: 4px;
    color: white;
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    width: 32%;
    min-height: 483px;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    width: 100%;
    min-height: 553px;
  }
`;

const Card = ({ post, onOpenModal, my, bookmark }: ICard) => {
  const refPrintCard = useRef<HTMLDivElement>(null);
  const refCard = useRef<HTMLUListElement>(null);
  let cardWidth = refCard.current?.offsetWidth;

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

  const [tagList, setTagList] = useState(post?.tagList ? post?.tagList : "");

  // @ts-ignore
  const splitTagList = tagList.split(" ");

  return (
    <>
      {my || bookmark ? (
        <PrintCardUl
          ref={refCard}
          style={{ height: `calc(${cardWidth}*86/54)px` }}
          onClick={onOpenModal}
        >
          <li>
            <img
              src={
                post?.imageUrl
                  ? `./PhotoCard/${post.imageUrl}`
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
          {post?.memo ? (
            <li>
              <span>메모</span>
              {post?.memo}
            </li>
          ) : (
            ""
          )}
          {post?.tagList ? (
            <li className="tagList">
              {splitTagList?.map((item: any) => (
                <li className="tag" key={item}>{`#${item}`}</li>
              ))}
            </li>
          ) : (
            ""
          )}
        </PrintCardUl>
      ) : (
        <CardUl
          ref={refCard}
          style={{ height: `calc(${cardWidth}*86/54)px` }}
          onClick={onOpenModal}
        >
          <li>
            <img
              src={
                post?.imageUrl
                  ? `./PhotoCard/${post.imageUrl}`
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
          {post?.memo ? (
            <li>
              <span>메모</span>
              {post?.memo}
            </li>
          ) : (
            ""
          )}
          {post?.tagList ? (
            <li className="tagList">
              {splitTagList?.map((item: any) => (
                <li className="tag" key={item}>{`#${item}`}</li>
              ))}
            </li>
          ) : (
            ""
          )}
        </CardUl>
      )}
    </>
  );
};

export default Card;
