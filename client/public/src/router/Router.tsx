import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import SigninPage from "../pages/auth/SigninPage";
import SignupPage from "../pages/auth/SignupPage";
import UnlockAccountPage from "../pages/auth/UnlockAccountPage";
import AboutPage from "../pages/general/AboutPage";
import ContactPage from "../pages/general/ContactPage";
import NotFoundPage from "../pages/general/NotFoundPage";
import StartPage from "../pages/general/StartPage";
import PrivacyPolicyPage from "../pages/general/PrivacyPolicyPage";
import LicensingPage from "../pages/general/LicensingPage";
import AccessRedirect from "../components/auth/AccessRedirect";
import ConnectInstallPage from "../pages/auth/connect/ConnectInstallPage";
import ConnectDocsPage from "../pages/auth/connect/ConnectDocsPage";
import ConnectPage from "../pages/auth/connect/ConnectPage";
import ConnectLayout from "../layouts/ConnectLayout";
import AccountLayout from "../layouts/AccountLayout";
import AdminLayout from "../layouts/AdminLayout";
import ReportedIssuesLayout from "../layouts/ReportedIssuesLayout";
import AccountOverviewPage from "../pages/account/OverviewPage";
import AccountSettingsPage from "../pages/account/SettingsPage";
import AccountInvoicesPage from "../pages/account/InvoicesPage";
import AccountCreatedAppsPage from "../pages/account/CreatedAppsPage";
import AccountAdminAppsPage from "../pages/account/AdminAppsPage";
import AccountActiveConnectionsPage from "../pages/account/ActiveConnectionsPage";
import AccountCreatedAppsDetailsPage from "../pages/account/CreatedAppDetailsPage";
import AccountControlledAppTrafficPage from "../pages/account/ControlledAppTrafficPage";
import AcccountAdminAppDetailsPage from "../pages/account/AdminAppDetailsPage";
import AccountInvoicePage from "../pages/account/InvoicePage";
import AdminOverviewPage from "../pages/admin/OverviewPage";
import AdminSettingsPage from "../pages/admin/SettingsPage";
import AdminUsersPage from "../pages/admin/UsersPage";
import AdminAppsPage from "../pages/admin/AppsPage";
import AdminIssuesPage from "../pages/admin/IssuesPage";
import AdminIssueDetailsPage from "../pages/admin/IssueDetailsPage";
import AdminResolvedIssuesPage from "../pages/admin/ResolvedIssuesPage";
import AdminTrafficPage from "../pages/admin/TrafficPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<StartPage />} />
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
        <Route index element={<AccountOverviewPage />} />
        <Route path="settings" element={<AccountSettingsPage />} />
        <Route path="invoices" element={<AccountInvoicesPage />}>
          <Route path=":invoiceid" element={<AccountInvoicePage />} />
        </Route>
        <Route path="myapps" element={<AccountCreatedAppsPage />}>
          <Route path=":appname">
            <Route index element={<AccountCreatedAppsDetailsPage />} />
            <Route path="traffic" element={<AccountControlledAppTrafficPage />} />
          </Route>
        </Route>
        <Route path="administeredapps" element={<AccountAdminAppsPage />}>
          <Route path=":appname">
            <Route index element={<AcccountAdminAppDetailsPage />} />
            <Route path="traffic" element={<AccountControlledAppTrafficPage />} />
          </Route>
        </Route>
        <Route path="activeconnections" element={<AccountActiveConnectionsPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverviewPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="apps" element={<AdminAppsPage />} />
        <Route path="reportedissues" element={<ReportedIssuesLayout />}>
          <Route index element={<AdminIssuesPage />} />
          <Route path=":issueid" element={<AdminIssueDetailsPage />} />
          <Route path="resolvedissues" element={<AdminResolvedIssuesPage />} />
        </Route>
        <Route path="traffic" element={<AdminTrafficPage />} />
        <Route path="activeconnections" element={<AccountActiveConnectionsPage />} />
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
