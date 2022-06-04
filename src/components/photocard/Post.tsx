import { useState } from "react";
import { GetPostType } from "../../lib/type";
import Card from "./Card";
import PostModal from "./PostModal";

export interface PostType {
  post: GetPostType | null;
  my?: boolean;
}

const Post = ({ post, my }: PostType) => {
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
      <PostModal post={post} open={openModal} close={onCloseModal} my={my} />
    </>
  );
};

export default Post;
