import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AccountPage from "../pages/auth/AccountPage";
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
import AccessRedirect from "../components/auth/AccessRedirect";
import ConnectInstallPage from "../pages/auth/connect/ConnectInstallPage";
import ConnectDocsPage from "../pages/auth/connect/ConnectDocsPage";
import ConnectPage from "../pages/auth/connect/ConnectPage";
import ConnectLayout from "../layouts/ConnectLayout";

const router = (isAuthenticated: boolean) => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/signup"
          element={
            <AccessRedirect>
              <SignupPage />
            </AccessRedirect>
          }
        />
        <Route
          path="/signin"
          element={
            <AccessRedirect>
              <SigninPage />
            </AccessRedirect>
          }
        />
        <Route
          path="/resetPassword"
          element={
            <AccessRedirect>
              <ResetPasswordPage />
            </AccessRedirect>
          }
        />
        <Route
          path="/unlockaccount"
          element={
            <AccessRedirect>
              <UnlockAccountPage />
            </AccessRedirect>
          }
        />
        <Route path="/connectapp" element={<ConnectLayout />}>
          <Route index element={<ConnectPage />} />
          <Route path="install" element={<ConnectInstallPage />} />
          <Route path="docs" element={<ConnectDocsPage />} />
        </Route>
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
