import { useRef } from "react";
import styled from "styled-components";
import { CardType } from "../../lib/type";
import palette from "../../styles/palette";
import Card from "./Card";
import CardDetail from "./CardDetail";

interface ModalType {
  post: CardType | null;
  open: boolean;
  close: () => void;
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

const PostModal = ({ post, open, close }: ModalType) => {
  return (
    <ModalBlock className={open ? "open" : ""}>
      <div className="container">
        <ul className="white-box">
          <li>
            <Card post={post} />
          </li>
          <li>
            <CardDetail post={post} />
          </li>
          <button onClick={close} title="닫기">
            <span className="material-icons">close</span>
          </button>
        </ul>
      </div>
    </ModalBlock>
  );
};

export default PostModal;
