import { Route, Routes } from "../node_modules/react-router-dom/index";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPage from "./pages/PrivacyPage";
import RegisterAuthPage from "./pages/RegisterAuthPage";
import RegisterFinPage from "./pages/RegisterFinPage";
import FindPwPage from "./pages/FindPwPage";
import FindPwFinPage from "./pages/FindPwFinPage";
import CPhotoCardPage from "./pages/CPhotoCardPage";
import BookMarksListPage from "./pages/BookMarksListPage";
import NoticePage from "./pages/NoticePage";
import MyPagePage from "./pages/MyPage";
import SetProfilePage from "./pages/SetProfilePage";
import QuitPage from "./pages/QuitPage";
import QuitFinPage from "./pages/QuitFinPage";
import NaverCallback from "./pages/NaverCallback";
import KakaoCallback from "./pages/KaKaoCallback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />
      <Route path="/register-auth" element={<RegisterAuthPage />} />
      <Route path="/register-fin" element={<RegisterFinPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/naverLogin" element={<NaverCallback />} />
      <Route path="/kakaoLogin" element={<KakaoCallback />} />
      <Route path="/findpw" element={<FindPwPage />} />
      <Route path="/findpw-fin" element={<FindPwFinPage />} />

      <Route path="/mypage" element={<MyPagePage />} />
      <Route path="/set-profile" element={<SetProfilePage />} />
      <Route path="/quit" element={<QuitPage />} />
      <Route path="/quit-fin" element={<QuitFinPage />} />
      <Route path="/create-photocard" element={<CPhotoCardPage />} />
      <Route path="/bookmarks" element={<BookMarksListPage />} />
      <Route path="/notice" element={<NoticePage />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
