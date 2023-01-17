import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import palette from "../../styles/palette";
import { PostType } from "./Post";
import { useNavigate } from "react-router";
import { bookmark, like } from "../../lib/api/post";
import { RootStateOrAny, useSelector } from "react-redux";

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
      color: ${palette.cyan[5]};
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
        span {
          transition: transform 300ms ease;
        }
        span:hover {
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

  const { user } = useSelector((state: RootStateOrAny) => state.user);

  const refLike = useRef<HTMLSpanElement>(null);
  const refLikeCancel = useRef<HTMLSpanElement>(null);
  const refBookmark = useRef<HTMLSpanElement>(null);
  const refBookmarkCancel = useRef<HTMLSpanElement>(null);

  const [likeCnt, setLikeCnt] = useState(0);
  const [cancelLikeCnt, setCancelLikeCnt] = useState(0);
  const [bookmarkCnt, setBookmarkCnt] = useState(0);
  const [cancelBookmarkCnt, setCancelBookmarkCnt] = useState(0);

  const [likeCheck, setLikeCheck] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [bookmarkCheck, setBookmarkCheck] = useState(false);

  useEffect(() => {
    setLikeCheck(detailPost?.liked.likeCheck as boolean);
    setLikeNum(detailPost?.liked.likeNum as number);
    setBookmarkCheck(detailPost?.bookmarkCheck as boolean);
  }, [
    bookmarkCheck,
    detailPost?.bookmarkCheck,
    detailPost?.liked.likeCheck,
    detailPost?.liked.likeNum,
    likeCheck,
    likeNum,
  ]);

  // 좋아요
  const onToggleLike = useCallback(() => {
    if (likeCheck) {
      like(post?.id as number)
        .then((res) => {
          if (res.status === 403) {
            alert("토큰 만료");
          }

          setLikeCnt((cnt) => cnt + 1);
          if (!refLike.current) return;
          if (likeCnt % 2) {
            refLike.current.style.color = "#ff6b6b";
          } else {
            refLike.current.style.color = `${palette.gray[6]}`;
          }

          setLikeNum((cnt) => cnt - 1);
          setLikeCheck(!likeCheck);
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      like(post?.id as number)
        .then((res) => {
          if (res.status === 403) {
            alert("토큰 만료");
          }

          setCancelLikeCnt((cnt) => cnt + 1);
          if (!refLikeCancel.current) return;
          if (cancelLikeCnt % 2) {
            refLikeCancel.current.style.color = `${palette.gray[6]}`;
          } else {
            refLikeCancel.current.style.color = "#ff6b6b";
          }

          setLikeNum((cnt) => cnt + 1);
          setLikeCheck(!likeCheck);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [cancelLikeCnt, likeCheck, likeCnt, post?.id]);

  // 북마크
  const onToggleBookmark = useCallback(() => {
    if (bookmarkCheck) {
      Swal.fire({
        title: "북마크를 취소하시겠습니까?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#20c997",
        cancelButtonColor: palette.gray[5],
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          bookmark(post?.id as number)
            .then((res) => {
              if (res.status === 403) {
                alert("토큰 만료");
              }

              setBookmarkCnt((cnt) => cnt + 1);

              if (!refBookmark.current) return;
              refBookmark.current.style.color = `${palette.gray[6]}`;

              Swal.fire({
                title: "북마크 삭제 완료!",
                text: "",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#20c997",
                confirmButtonText: "확인",
                iconColor: palette.gray[5],
              }).then((result) => {
                if (result.isConfirmed) {
                  // eslint-disable-next-line no-restricted-globals
                  location.reload();
                }
              });
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
        confirmButtonColor: "#20c997",
        cancelButtonColor: palette.gray[5],
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          bookmark(post?.id as number)
            .then((res) => {
              if (res.status === 403) {
                alert("토큰 만료");
              }

              setCancelBookmarkCnt((cnt) => cnt + 1);

              if (!refBookmarkCancel.current) return;
              refBookmarkCancel.current.style.color = "#20c997";

              Swal.fire({
                title: "북마크 추가 완료!",
                text: "",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
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
            })
            .catch((err) => {
              console.warn(err);
            });
        }
      });
    }
  }, [bookmarkCheck, close, navigate, post?.id]);

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
          {detailPost?.memo ? (
            <li>
              <span>메모</span>
              {detailPost?.memo}
            </li>
          ) : (
            ""
          )}
          {detailPost?.tagList ? (
            <li className="tag">
              {detailPost?.tagList?.map((item) => `#${item} `)}
            </li>
          ) : (
            ""
          )}
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
                  {likeCheck ? (
                    <span className="material-icons like" ref={refLike}>
                      favorite
                    </span>
                  ) : (
                    <span className="material-icons" ref={refLikeCancel}>
                      favorite_outline
                    </span>
                  )}
                </button>
                <span>{likeNum}</span>
              </div>
              <button
                title="북마크"
                onClick={onToggleBookmark}
                className="bookmark-btn"
              >
                {bookmarkCheck ? (
                  <span className="material-icons bookmark" ref={refBookmark}>
                    bookmark
                  </span>
                ) : (
                  <span className="material-icons" ref={refBookmarkCancel}>
                    bookmark_outline
                  </span>
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
