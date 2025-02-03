import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AccountPage from "../pages/auth/AccountPage";
import ConnectAppPage from "../pages/auth/ConnectAppPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import SigninPage from "../pages/auth/SigninPage";
import SignupPage from "../pages/auth/SignupPage";
import UnlockAccountPage from "../pages/auth/UnlockAccountPage";
import AboutPage from "../pages/general/AboutPage";
import ContactPage from "../pages/general/ContactPage";
import NotFoundPage from "../pages/general/NotFoundPage";
import StartPage from "../pages/general/StartPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PrivacyPolicyPage from "../pages/general/PrivacyPolicyPage";
import LicensingPage from "../pages/general/LicensingPage";

const router = (isAuthenticated: boolean) => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/unlockaccount" element={<UnlockAccountPage />} />
        <Route path="/connectapp" element={<ConnectAppPage />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute allowCondition={isAuthenticated}>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
        <Route path="/licensing" element={<LicensingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
};

export default router;
