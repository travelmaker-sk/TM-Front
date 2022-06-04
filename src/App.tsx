import { Route, Routes } from "../node_modules/react-router-dom/index";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPage from "./pages/PrivacyPage";
import RegisterAuthPage from "./pages/RegisterAuthPage";
import RegisterFinPage from "./pages/RegisterFinPage";

import BookMarksListPage from "./pages/BookMarksListPage";
import MyPagePage from "./pages/MyPage";
import SetProfilePage from "./pages/SetProfilePage";
import QuitPage from "./pages/QuitPage";
import QuitFinPage from "./pages/QuitFinPage";
import NaverCallback from "./pages/NaverCallback";
import KakaoCallback from "./pages/KaKaoCallback";
import FindPwPage from "./pages/FindPwPage";
import FindPwFinPage from "./pages/FindPwFinPage";
import CreateCardPage from "./pages/CreateCardPage";
import SearchPage from "./pages/SearchPage";
import ScrollToTop from "./components/common/ScrollToTop";
import MorePage from "./pages/MorePage";
import EditCardPage from "./pages/EditCardPage";

function App() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacyPolicy" element={<PrivacyPage />} />
        <Route path="/registerAuth" element={<RegisterAuthPage />} />
        <Route path="/registerFin" element={<RegisterFinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/naverLogin" element={<NaverCallback />} />
        <Route path="/kakaoLogin" element={<KakaoCallback />} />
        <Route path="/findPw" element={<FindPwPage />} />
        <Route path="/findPwFin" element={<FindPwFinPage />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="/mypage" element={<MyPagePage />} />
        <Route path="/setProfile" element={<SetProfilePage />} />
        <Route path="/quit" element={<QuitPage />} />
        <Route path="/quitFin" element={<QuitFinPage />} />
        <Route path="/createPhotocard" element={<CreateCardPage />} />
        <Route path="/editPhotocard" element={<EditCardPage />} />
        <Route path="/bookmarks" element={<BookMarksListPage />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </ScrollToTop>
  );
}

export default App;
