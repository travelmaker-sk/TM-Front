import { useCallback, useState } from "react";
import { DetailPostType, GetPostType } from "../../lib/type/post";
import Card from "./Card";
import PostModal from "./PostModal";
import { loadPost } from "../../lib/api/home";
import Loading from "../common/Loading";

export interface PostType {
  post: GetPostType | null;
  detailPost?: DetailPostType | null;
  close?: () => void;
  my?: boolean;
  bookmark?: boolean;
}

const Post = ({ post, my, bookmark }: PostType) => {
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [detailPost, setDetailPost] = useState<DetailPostType | null>();

  const onOpenModal = useCallback(() => {
    setOpenModal(true);
    setLoading(true);

    // @ts-ignore
    loadPost(post?.id)
      .then((res) => {
        if (res.status === 403) {
          alert("토큰 만료");
        }

        setDetailPost(res);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [post?.id]);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card post={post} onOpenModal={onOpenModal} />
      <PostModal
        post={post}
        detailPost={detailPost}
        open={openModal}
        close={onCloseModal}
        my={my}
        bookmark={bookmark}
      />
      {loading ? <Loading /> : ""}
    </>
  );
};

export default Post;
