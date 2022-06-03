import { Route, Routes } from "../node_modules/react-router-dom/index";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPage from "./pages/PrivacyPage";
import RegisterAuthPage from "./pages/RegisterAuthPage";
import RegisterFinPage from "./pages/RegisterFinPage";

import CPhotoCardPage from "./pages/CreateCardPage";
import BookMarksListPage from "./pages/BookMarksListPage";
import MyPagePage from "./pages/MyPage";
import SetProfilePage from "./pages/SetProfilePage";
import QuitPage from "./pages/QuitPage";
import QuitFinPage from "./pages/QuitFinPage";
import NaverCallback from "./pages/NaverCallback";
import KakaoCallback from "./pages/KaKaoCallback";
import FindPwPage from "./pages/FindPwPage";
import FindPwFinPage from "./pages/FindPwFinPage";
import DetailPostsPage from "./pages/SearchMorePostsPage";
import CreateCardPage from "./pages/CreateCardPage";
import SearchAllPostsPage from "./pages/SearchAllPostsPage";

function App() {
  return (
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

      <Route path="/search" element={<SearchAllPostsPage />} />
      <Route path="/morePosts" element={<DetailPostsPage />} />
      <Route path="/mypage" element={<MyPagePage />} />
      <Route path="/setProfile" element={<SetProfilePage />} />
      <Route path="/quit" element={<QuitPage />} />
      <Route path="/quitFin" element={<QuitFinPage />} />
      <Route path="/createPhotocard" element={<CreateCardPage />} />
      <Route path="/bookmarks" element={<BookMarksListPage />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
