import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { addLike, delLike } from "../../lib/api/post";
import palette from "../../styles/palette";
import { PostType } from "./Post";

const CardDetailStyle = styled.div`
  ul {
    > li:nth-of-type(1) {
      display: flex;
      align-items: center;
      font-size: 18px;
      img {
        width: 28px;
        margin-right: 15px;
      }
    }
    > li:nth-of-type(2) {
      li {
        display: flex;
        line-height: 1.5em;
        margin-bottom: 10px;
        span {
          width: 40px;
          font-weight: 600;
        }
      }
      .tag {
        margin-top: 32px;
        color: ${palette.gray[6]};
      }
    }
    > li:nth-of-type(3) {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      span {
        font-size: 28px;
        color: ${palette.gray[6]};
      }
      .like-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        > span {
          font-size: 16px;
        }
      }
      button {
        &.like-btn {
          span.not-like,
          span.like {
            transition: transform 300ms ease;
          }
          span.not-like:hover,
          span.like:hover {
            transform: scale(1.1);
          }
          span.like {
            color: #f06595;
          }
        }
      }
      // Mobile
      @media screen and (max-width: 767px) {
        margin-bottom: 32px;
      }
    }
    hr {
      border: none;
      background-color: ${palette.gray[6]};
      height: 1.2px;
      margin: 32px 0;
    }
  }
`;

const CardDetail = ({ post }: PostType) => {
  const [like, setLike] = useState(post?.like.likeCheck);
  const [cntLike, setCntLike] = useState(post?.like.likeNum ?? 0);

  const onToggleLike = useCallback(() => {
    if (like) {
      delLike(post?.id as number).then((res) => {
        setCntLike((cnt) => cnt - 1);
      });
      console.log("delLike");
    } else {
      addLike(post?.id as number).then((res) => {
        setCntLike((cnt) => cnt + 1);
      });
      console.log("addLike");
    }

    setLike(!like);
  }, [like, post?.id]);

  return (
    <>
      <CardDetailStyle>
        <ul>
          <li>
            <img
              src={
                post?.writer.profileImage
                  ? post?.writer.profileImage
                  : "./images/default-profile.png"
              }
              alt="profileImage"
            />
            <span>{post?.writer.username}</span>
          </li>
          <hr />
          <li>
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
          </li>
          <hr />
          <li>
            <div className="like-container">
              <button
                title="좋아요"
                onClick={onToggleLike}
                className="like-btn"
              >
                {like ? (
                  <span className="material-icons like">favorite</span>
                ) : (
                  <span className="material-icons not-like">
                    favorite_outline
                  </span>
                )}
              </button>
              <span>{cntLike}</span>
            </div>
            <button title="북마크 추가" className="bookmark-btn">
              <span className="material-icons">bookmark_outline</span>
            </button>
          </li>
        </ul>
      </CardDetailStyle>
    </>
  );
};

export default CardDetail;
