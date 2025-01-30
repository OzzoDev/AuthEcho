import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import AccountPage from "../pages/AccountPage";
import AdminPage from "../pages/AdminPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import SignInPage from "../pages/SignInPage";
import SlideInFromBottom from "../layouts/animation/SlideInFromBottom";
import RootLayout from "../layouts/RootLayout";

const Router = (isAuthenticated: boolean, isAdmin: boolean) => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="signin"
          element={
            <SlideInFromBottom>
              <SignInPage />
            </SlideInFromBottom>
          }
        />
        <Route
          path="account"
          element={
            <ProtectedRoute allowCondition={isAuthenticated}>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute allowCondition={isAuthenticated && isAdmin} fallbackPath="/account">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
};

export default Router;
