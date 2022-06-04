import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import Bookmarks from "../components/bookmark/Bookmarks";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { Wrapper } from "./HomePage";
import { HeaderBottomPlus } from "./MyPage";

const BookMarksPage = () => {
  const { user } = useSelector((state: RootStateOrAny) => state.user);

  return (
    <Wrapper>
      <Header />
      <Bookmarks user={user} />
      <Footer />
    </Wrapper>
  );
};

export default BookMarksPage;
