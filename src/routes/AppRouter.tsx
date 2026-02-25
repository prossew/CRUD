import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersPage from "../pages/UserPage";
import UserDetailsPage from "../pages/UserDetailsPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;