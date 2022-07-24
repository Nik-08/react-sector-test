import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PostsPage } from "./pages/PostsPage";

export const App = () => {
  return (
    <Routes>
      <Route element={<PostsPage />} path='/' />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
