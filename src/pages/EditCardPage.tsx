import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import EditCard from "../components/write/EditCard";
import { Wrapper } from "./HomePage";
import { HeaderBottomPlus } from "./MyPage";

const EditCardPage = () => {
  return (
    <Wrapper>
      <Header />
      <HeaderBottomPlus />
      <EditCard />
      <Footer />
    </Wrapper>
  );
};

export default EditCardPage;
