import styled from "styled-components";

const LoadingDiv = styled.div`
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
`;

export const Loading = () => {
  return <LoadingDiv>로딩중</LoadingDiv>;
};
