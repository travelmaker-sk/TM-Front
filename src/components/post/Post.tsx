import { useRef, useState } from "react";
import styled from "styled-components";
import { CardType } from "../../lib/type";
import palette from "../../styles/palette";
import Card from "./Card";
import ModalCard from "./ModalPost";

export interface PostType {
  post: CardType | null;
}

export const CardStyle = styled.div`
  width: 23.875%;
  padding: 16px;
  margin-bottom: 32px;
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

const Post = ({ post }: PostType) => {
  const refCard = useRef<HTMLDivElement>(null);
  const cardHeight = refCard.current?.offsetWidth;

  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = () => {
    console.log("click modal");
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <CardStyle
        ref={refCard}
        style={{ height: `calc(${cardHeight}*86/54)px` }}
        onClick={onOpenModal}
      >
        <Card post={post} />
      </CardStyle>
      <ModalCard post={post} open={openModal} close={onCloseModal} />
    </>
  );
};

export default Post;
