import React from "react";
import Bookmarks from "../components/bookmark/Bookmarks";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import ScrollToTopButton from "../components/common/scrollToTopButton";
import { Wrapper } from "./HomePage";

import styled from "styled-components";
import palette from "../styles/palette";

const BookmarkMarkBlock = styled.div`
  height: 100%;
  background-color: ${palette.gray[1]};
`;

const BookMarksPage = () => {
  return (
    <BookmarkMarkBlock>
      <Wrapper>
        <Header />
        <Bookmarks />
        <Footer />
        <ScrollToTopButton />
      </Wrapper>
    </BookmarkMarkBlock>
  );
};

export default BookMarksPage;
