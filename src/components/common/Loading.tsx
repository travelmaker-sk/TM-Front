import styled from "styled-components";

const LoadingDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100w;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 8888;
  img {
    width: 80px;
    height: auto;
    margin-bottom: 20px;
  }
`;

const Loading = () => {
  return (
    <LoadingDiv>
      <img src="./images/logo.png" alt="loading" />
      로딩중 ...
    </LoadingDiv>
  );
};

export default Loading;
