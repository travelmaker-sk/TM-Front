import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { deletePost } from "../../lib/api/write";
import { DetailPostType, GetPostType } from "../../lib/type";
import { CyanButtonStyle, GrayButtonStyle } from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import Card from "./Card";
import CardDetail from "./CardDetail";
import { useNavigate } from "react-router";
import ReactToPrint from "react-to-print";
import Loading from "../common/Loading";

interface ModalType {
  post: GetPostType | null;
  detailPost?: DetailPostType | null;
  open: boolean;
  close: () => void;
  my?: boolean;
  bookmark?: boolean;
}

const ModalBlock = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background-color: rgba(0, 0, 0, 0.6);
  &.open {
    display: block;
  }
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .white-box {
    width: 65%;
    height: 70%;
    padding: 0 5%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    animation: modal-show 0.3s;
    > li:first-of-type {
      width: 324px;
      height: 516px;
      min-height: 516px;
      > * {
        margin-bottom: 0;
        width: 100%;
        min-height: 516px;
        box-shadow: none;
      }
    }
    > li:last-of-type {
      width: 324px;
      margin-left: 8%;
    }
    > button {
      position: absolute;
      top: 30px;
      right: 30px;
      span {
        font-size: 32px;
        font-weight: 700;
      }
      span:hover {
        color: ${palette.gray[6]};
      }
    }
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    .white-box {
      width: 80%;
    }
  }
  // Mobile
  @media screen and (max-width: 767px) {
    .white-box {
      width: 80%;
      height: 90%;
      display: block;
      padding: 25px 7%;
      overflow: scroll;
      > li {
        width: 100%;
      }
      > li:first-of-type {
        width: 243px;
        height: 473px;
        min-height: 473px;
        margin: 0 auto;
        > * {
          min-height: 473px;
        }
      }
      > li:last-of-type {
        width: 100%;
        margin-top: 40px;
        margin-left: 0;
      }
    }
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const MyButton = styled.div`
  display: flex;
  position: absolute;
  bottom: -62px;
  right: 0;
  > * {
    margin-left: 15px;
    width: 150px;
  }
  .print-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    width: 100%;
    position: static;
    > * {
      margin-left: 10px;
    }
    > *:first-child {
      margin-left: 0;
    }
  }
`;

const BookmarkButton = styled.div`
  position: absolute;
  bottom: -62px;
  right: 0;
  > * {
    width: 150px;
  }
  .print-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    position: static;
    > * {
      width: 100%;
    }
  }
`;

const PostModal = ({
  post,
  detailPost,
  open,
  close,
  my,
  bookmark,
}: ModalType) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const refCard = useRef<HTMLLIElement>(null);

  // 수정 버튼
  const onEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      navigate("/editPhotocard", { state: post });
    },
    [navigate, post]
  );

  // 삭제 버튼
  const onDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setLoading(true);

      // @ts-ignore
      deletePost(post?.id)
        .then((res) => {
          if (res) {
            close();
            Swal.fire({
              title: "포토카드 삭제 완료!",
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
          }
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [close, post?.id]
  );

  return (
    <>
      <ModalBlock className={open ? "open" : ""}>
        <div className="container">
          <ul className="white-box">
            <li ref={refCard}>
              <Card post={post} />
            </li>
            <li>
              <CardDetail post={post} close={close} detailPost={detailPost} />
            </li>
            <button onClick={close} title="닫기">
              <span className="material-icons">close</span>
            </button>
            {my ? (
              <MyButton>
                <ReactToPrint
                  trigger={() => (
                    <CyanButtonStyle>
                      <button className="print-btn">
                        <span className="material-icons">print</span> &nbsp;
                        인쇄
                      </button>
                    </CyanButtonStyle>
                  )}
                  content={() => refCard.current}
                />
                <CyanButtonStyle>
                  <button onClick={onEdit}>수정</button>
                </CyanButtonStyle>
                <GrayButtonStyle>
                  <button onClick={onDelete}>삭제</button>
                </GrayButtonStyle>
              </MyButton>
            ) : (
              ""
            )}
            {bookmark ? (
              <BookmarkButton>
                <ReactToPrint
                  trigger={() => (
                    <CyanButtonStyle>
                      <button className="print-btn">
                        <span className="material-icons">print</span> &nbsp;
                        인쇄
                      </button>
                    </CyanButtonStyle>
                  )}
                  content={() => refCard.current}
                />
              </BookmarkButton>
            ) : (
              ""
            )}
          </ul>
        </div>
      </ModalBlock>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default PostModal;
