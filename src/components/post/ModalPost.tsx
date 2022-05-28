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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    > li {
      width: 42.5%;
    }
    > li:first-child {
      margin-right: 5%;
    }
  }
`;

export const ModalCardStyle = styled.div`
  width: 100%;
  padding: 16px;
  margin: 0;
  border: 1.5px solid ${palette.gray[3]};
  cursor: pointer;
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
    margin-top: 32px;
    color: ${palette.gray[6]};
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    width: 32.333%;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const ModalPost = ({ post, open, close }: ModalType) => {
  const refCard = useRef<HTMLDivElement>(null);
  const cardWidth = refCard.current?.offsetWidth;
  console.log("cardWidth", cardWidth);
  return (
    <ModalBlock className={open ? "open" : ""}>
      <div className="container">
        <ul className="white-box">
          <li>
            <ModalCardStyle
              ref={refCard}
              style={{ height: `calc(${cardWidth}*86/54)px` }}
            >
              <Card post={post} />
            </ModalCardStyle>
          </li>
          <li>
            <CardDetail post={post} />
          </li>
        </ul>
        <button onClick={close}>닫기</button>
      </div>
    </ModalBlock>
  );
};

export default ModalPost;
