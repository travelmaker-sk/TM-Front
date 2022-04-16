import React from "react";
import Responsive from "../components/common/Responsive";
import styled from "styled-components";
import HeaderContainer from "../containers/common/HeaderContainer";

const Wrapeer = styled(Responsive)``;

const PostListPage = () => {
  return (
    <Wrapeer>
      <HeaderContainer />
      <div style={{ marginTop: "88.3008px" }}>
        포<br />스<br />트<br />리<br />스<br />트
      </div>
    </Wrapeer>
  );
};

export default PostListPage;
