import styled from "styled-components";
import { CardType } from "../../lib/type";

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
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
  &.open {
    display: block;
  }
`;

const ModalPost = ({ post, open, close }: ModalType) => {
  console.log(open);

  return (
    <ModalBlock className={open ? "open" : ""}>
      {open ? (
        <div>
          모달
          <button onClick={close}>닫기</button>
        </div>
      ) : null}
    </ModalBlock>
  );
};

export default ModalPost;
