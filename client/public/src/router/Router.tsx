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
import AccountLayout from "../layouts/AccountLayout";
import OverviewPage from "../pages/account/OverviewPage";
import { lazy, Suspense } from "react";
import { HashLoader } from "react-spinners";

const AccountOverviewPage = lazy(() => import("../pages/account/OverviewPage"));
const AccountSettingsPage = lazy(() => import("../pages/account/SettingsPage"));
const AccountInvoicesPage = lazy(() => import("../pages/account/InvoicesPage"));
const AccountCreatedAppsPage = lazy(() => import("../pages/account/CreatedAppsPage"));
const AccountAdminAppsPage = lazy(() => import("../pages/account/AdminAppsPage"));
const AccountActiveConnectionsPage = lazy(() => import("../pages/account/ActiveConnectionsPage"));

const Loader = <HashLoader size={50} color="white" />;

const router = createBrowserRouter(
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

      <Route path="/account" element={<AccountLayout />}>
        <Route
          index
          element={
            <Suspense fallback={Loader}>
              <AccountOverviewPage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={Loader}>
              <AccountSettingsPage />
            </Suspense>
          }
        />
        <Route
          path="invoices"
          element={
            <Suspense fallback={Loader}>
              <AccountInvoicesPage />
            </Suspense>
          }
        />{" "}
        <Route
          path="myapps"
          element={
            <Suspense fallback={Loader}>
              <AccountCreatedAppsPage />
            </Suspense>
          }
        />{" "}
        <Route
          path="administeredapps"
          element={
            <Suspense fallback={Loader}>
              <AccountAdminAppsPage />
            </Suspense>
          }
        />{" "}
        <Route
          path="activeconnections"
          element={
            <Suspense fallback={Loader}>
              <AccountActiveConnectionsPage />
            </Suspense>
          }
        />
        {/* 
          <Route path="settings" element={<AccountOverviewPage />} />
          <Route path="invoices" element={<AccountOverviewPage />} />
          <Route path="myapps" element={<AccountOverviewPage />} />
          <Route path="administeredapps" element={<AccountOverviewPage />} />
          <Route path="activeconnections" element={<AccountOverviewPage />} /> */}
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
      <Route path="/licensing" element={<LicensingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
export default router;
