import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import Bookmarks from "../components/bookmark/Bookmarks";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import ScrollToTopButton from "../components/common/scrollToTopButton";
import { Wrapper } from "./HomePage";

const BookMarksPage = () => {
  return (
    <Wrapper>
      <Header />
      <Bookmarks />
      <Footer />
      <ScrollToTopButton />
    </Wrapper>
  );
};

export default BookMarksPage;
