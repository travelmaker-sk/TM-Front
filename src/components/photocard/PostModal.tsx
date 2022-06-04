import { useCallback, useRef } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { deletePost } from "../../lib/api/write";
import { GetPostType } from "../../lib/type";
import {
  CyanButtonStyle,
  GrayButtonStyle,
  SelectButtonStyle,
} from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import Card from "./Card";
import CardDetail from "./CardDetail";
import { useNavigate } from "react-router";

interface ModalType {
  post: GetPostType | null;
  open: boolean;
  close: () => void;
  my?: boolean;
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
  z-index: 9999;
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
    > li {
      width: 40%;
    }
    > li:first-child {
      margin-right: 10%;
      > * {
        width: 100%;
      }
    }
    > button {
      position: absolute;
      top: 30px;
      right: 30px;
      span {
        font-size: 32px;
        font-weight: 600;
      }
      span:hover {
        color: ${palette.cyan[8]};
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
      > li:first-child {
        margin-right: 0;
      }
    }
  }
`;

const MyButton = styled.div`
  width: 300px;
  position: absolute;
  bottom: -62px;
  right: 0;
  // Mobile
  @media screen and (max-width: 767px) {
    width: 100%;
    position: static;
  }
`;

const PostModal = ({ post, open, close, my }: ModalType) => {
  console.log("my", my);

  const navigate = useNavigate();

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

      // @ts-ignore
      deletePost(post?.id).then((res) => {
        if (res) {
          console.log("포토카드 삭제 실패");
          return;
        } else {
          close();
          Swal.fire("포토카드 삭제 완료!", "", "success");
          navigate("/mypage");
        }
      });
    },
    [close, navigate, post?.id]
  );

  return (
    <ModalBlock className={open ? "open" : ""}>
      <div className="container">
        <ul className="white-box">
          <li>
            <Card post={post} />
          </li>
          <li>
            <CardDetail post={post} my={my} />
          </li>
          <button onClick={close} title="닫기">
            <span className="material-icons">close</span>
          </button>
          {my ? (
            <MyButton>
              <SelectButtonStyle>
                <CyanButtonStyle>
                  <button onClick={onEdit}>수정</button>
                </CyanButtonStyle>
                <GrayButtonStyle>
                  <button onClick={onDelete}>삭제</button>
                </GrayButtonStyle>
              </SelectButtonStyle>
            </MyButton>
          ) : (
            ""
          )}
        </ul>
      </div>
    </ModalBlock>
  );
};

export default PostModal;
