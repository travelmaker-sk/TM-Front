import { Route, Routes } from "../node_modules/react-router-dom/index";

import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}

      <Route path="/@:username" element={<PostListPage />} />
      <Route path="/" element={<PostListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/@:username/:postId" element={<PostPage />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
