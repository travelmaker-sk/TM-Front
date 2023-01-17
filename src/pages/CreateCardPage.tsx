import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import CreateCard from "../components/write/CreateCard";
import { Wrapper } from "./HomePage";
import { HeaderBottomPlus } from "./MyPage";

const CreateCardPage = () => {
  return (
    <Wrapper>
      <Header />
      <HeaderBottomPlus />
      <CreateCard />
      <Footer />
    </Wrapper>
  );
};

export default CreateCardPage;
