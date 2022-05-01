import { Route, Routes } from "../node_modules/react-router-dom/index";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPage from "./pages/PrivacyPage";
import RegisterAuthPage from "./pages/RegisterAuthPage";
import RegisterFinPage from "./pages/RegisterFinPage";
import FindPwPage from "./pages/FindPwPage";
import FindPwAuthPage from "./pages/FindPwAuthPage";
import NaverLoginPage from "./pages/NaverLogin";
import CPhotoCardPage from "./pages/CPhotoCardPage";
import BookMarksListPage from "./pages/BookMarksListPage";
import NoticePage from "./pages/NoticePage";
import MyPagePage from "./pages/MyPage";
import SetProfilePage from "./pages/SetProfilePage";
import SetProfileFinPage from "./pages/SetProfileFinPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/privacyPolicy" element={<PrivacyPage />} />
      <Route path="/registerAuth" element={<RegisterAuthPage />} />
      <Route path="/registerFin" element={<RegisterFinPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/naver" element={<NaverLoginPage />} />
      <Route path="/findPw" element={<FindPwPage />} />
      <Route path="/findPwAuth" element={<FindPwAuthPage />} />

      <Route path="/mypage" element={<MyPagePage />} />
      <Route path="/set-profile" element={<SetProfilePage />} />
      <Route path="/set-profile-fin" element={<SetProfileFinPage />} />
      <Route path="/create-photocard" element={<CPhotoCardPage />} />
      <Route path="/bookmarks" element={<BookMarksListPage />} />
      <Route path="/notice" element={<NoticePage />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
