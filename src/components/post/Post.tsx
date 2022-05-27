import { useRef, useState } from "react";
import styled from "styled-components";
import { CardType } from "../../lib/type";
import palette from "../../styles/palette";
import Card from "./Card";
import ModalCard from "./ModalPost";

export interface PostType {
  post: CardType | null;
}

const Post = ({ post }: PostType) => {
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
      <Card post={post} onOpenModal={onOpenModal} />
      <ModalCard post={post} open={openModal} close={onCloseModal} />
    </>
  );
};

export default Post;
