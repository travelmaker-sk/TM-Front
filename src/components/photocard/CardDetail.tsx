import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import palette from "../../styles/palette";
import { PostType } from "./Post";
import { useNavigate } from "react-router";
import { bookmark, like } from "../../lib/api/post";
import { RootStateOrAny, useSelector } from "react-redux";
import { loadPost } from "../../lib/api/home";
import { DetailPostType, GetPostType } from "../../lib/type";

const CardDetailDiv = styled.div`
  > ul:nth-of-type(1) {
    display: flex;
    align-items: center;
    font-size: 18px;
    img {
      width: 28px;
      margin-right: 15px;
    }
  }
  > ul:nth-of-type(2) {
    li {
      display: flex;
      line-height: 1.5em;
      margin-bottom: 10px;
      span {
        width: 40px;
        font-weight: 700;
      }
    }
    .tag {
      margin-top: 40px;
      color: ${palette.cyan[7]};
    }
  }
  > ul:nth-of-type(3) {
    display: flex;
    justify-content: space-between;
    color: ${palette.gray[6]};
    > li:nth-of-type(2) {
      display: flex;
      align-items: flex-start;
    }
    span {
      font-size: 28px;
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
        span.cancel-like,
        span.like {
          transition: transform 300ms ease;
        }
        span.cancel-like:hover,
        span.like:hover {
          transform: scale(1.1);
        }
        span.like {
          color: #ff6b6b;
        }
      }
      &.bookmark-btn {
        span {
          transition: transform 300ms ease;
        }
        span:hover {
          transform: scale(1.1);
        }
        span.bookmark {
          color: #20c997;
        }
      }
    }
    // Mobile
    @media screen and (max-width: 767px) {
      margin-bottom: 40px;
    }
  }
  hr {
    border: none;
    background-color: ${palette.gray[6]};
    height: 1.2px;
    margin: 32px 0;
  }
`;

const CardDetail = ({ post, close, detailPost }: PostType) => {
  const navigate = useNavigate();

  const [checkLike, setCheckLike] = useState(detailPost?.liked?.likeCheck);
  const [numLike, setNumLike] = useState(detailPost?.liked?.likeNum ?? 0);

  const [checkBookmark, setCheckBookmark] = useState(detailPost?.bookmarkCheck);

  const { user } = useSelector((state: RootStateOrAny) => state.user);

  // 좋아요
  const onToggleLike = useCallback(() => {
    if (checkLike) {
      // @ts-ignore
      like(post?.id)
        .then((res) => {
          setNumLike((cnt) => cnt - 1);
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      // @ts-ignore
      like(post?.id)
        .then((res) => {
          setNumLike((cnt) => cnt + 1);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
    setCheckLike(!checkLike);
  }, [checkLike, post?.id]);

  // 북마크
  const onToggleBookmark = useCallback(() => {
    if (checkBookmark) {
      Swal.fire({
        title: "북마크를 취소하시겠습니까?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: palette.cyan[5],
        cancelButtonColor: palette.gray[5],
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          // @ts-ignore
          bookmark(post?.id)
            .then(() => {
              Swal.fire({
                title: "북마크 취소 완료!",
                icon: "success",
                confirmButtonColor: palette.cyan[5],
                confirmButtonText: "확인",
              });

              setCheckBookmark(!checkBookmark);
            })
            .catch((err) => {
              console.warn(err);
            });
        }
      });
    } else {
      Swal.fire({
        title: "북마크를 추가하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: palette.cyan[5],
        cancelButtonColor: palette.gray[5],
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          // @ts-ignore
          bookmark(post?.id)
            .then(() => {
              Swal.fire({
                title: "북마크 추가 완료!",
                text: "",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: palette.cyan[5],
                cancelButtonColor: palette.gray[5],
                confirmButtonText: "내 북마크로 이동",
                cancelButtonText: "취소",
              }).then((result) => {
                if (result.isConfirmed) {
                  //@ts-ignore
                  close();
                  navigate("/bookmarks");
                }
              });

              setCheckBookmark(!checkBookmark);
            })
            .catch((err) => {
              console.warn(err);
            });
        }
      });
    }
  }, [checkBookmark, close, navigate, post?.id]);

  // useEffect(() => {
  //   // @ts-ignore
  //   loadPost(post?.id)
  //     .then((res) => {
  //       console.log("detailPost", res);
  //       setDetailPost(res);
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //     });
  // }, [post?.id]);

  return (
    <>
      <CardDetailDiv>
        <ul>
          <li>
            <img
              src={
                detailPost?.writer?.profileImage
                  ? detailPost.writer.profileImage
                  : "./images/default-profile.png"
              }
              alt="ProfileImage"
            />
          </li>
          <li>{detailPost?.writer?.username}</li>
        </ul>
        <hr />
        <ul>
          <li>
            <span>제목</span>
            {detailPost?.title}
          </li>
          <li>
            <span>위치</span>
            {detailPost?.location}
          </li>
          <li>
            <span>날짜</span>
            {detailPost?.date}
          </li>
          {detailPost?.weather ? (
            <li>
              <span>날씨</span>
              {detailPost?.weather}
            </li>
          ) : (
            ""
          )}
          {detailPost?.menu ? (
            <li>
              <span>메뉴</span>
              {detailPost?.menu}
            </li>
          ) : (
            ""
          )}
          {detailPost?.price ? (
            <li>
              <span>가격</span>
              {detailPost?.price}
            </li>
          ) : (
            ""
          )}
          <li>
            <span>평점</span>
            {detailPost?.score}
          </li>
          <li>
            <span>메모</span>
            {detailPost?.memo}
          </li>
          {/* <li className="tag">{detailPost?.tagList?.map((item) => `#${item} `)}</li> */}
        </ul>
        <hr />
        <ul>
          <li>조회수 {detailPost?.viewCount}</li>
          {user ? (
            <li>
              <div className="like-container">
                <button
                  title="좋아요"
                  onClick={onToggleLike}
                  className="like-btn"
                >
                  {checkLike ? (
                    <span className="material-icons like">favorite</span>
                  ) : (
                    <span className="material-icons cancel-like">
                      favorite_outline
                    </span>
                  )}
                </button>
                <span>{numLike}</span>
              </div>
              <button
                title="북마크"
                onClick={onToggleBookmark}
                className="bookmark-btn"
              >
                {checkBookmark ? (
                  <span className="material-icons bookmark">bookmark</span>
                ) : (
                  <span className="material-icons">bookmark_outline</span>
                )}
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </CardDetailDiv>
    </>
  );
};

export default CardDetail;
