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

const router = createBrowserRouter(
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
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

export default router;
