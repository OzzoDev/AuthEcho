import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import StartPage from "../pages/StartPage";
import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AccountPage from "../pages/AccountPage";
import ConnectAppPage from "../pages/ConnectAppPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import UnlockAccountPage from "../pages/UnlockAccountPage";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<StartPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/resetPassword" element={<ResetPasswordPage />} />
      <Route path="/unlockaccount" element={<UnlockAccountPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/connectapp" element={<ConnectAppPage />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
