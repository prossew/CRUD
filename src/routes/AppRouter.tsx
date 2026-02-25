import { HashRouter, Routes, Route } from "react-router-dom";
import UsersPage from "../pages/UserPage";
import UserDetailsPage from "../pages/UserDetailsPage";

const AppRouter = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />
    </Routes>
  </HashRouter>
);

export default AppRouter;