import { Route, Routes } from "../node_modules/react-router-dom/index";

import PostListPage from "./pages/PostListPage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPage from "./pages/PrivacyPage";
import RegisterAuthPage from "./pages/RegisterAuthPage";
import RegisterCompletePage from "./pages/RegisterCompletePage";
import FindPwAuthPage from "./pages/FindPwAuthPage";
import FindPwCompletePage from "./pages/FindPwCompletePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/privacyPolicy" element={<PrivacyPage />} />
      <Route path="/registerAuth" element={<RegisterAuthPage />} />
      <Route path="/registerComplete" element={<RegisterCompletePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/findPwAuth" element={<FindPwAuthPage />} />
      <Route path="/findPwComplete" element={<FindPwCompletePage />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
