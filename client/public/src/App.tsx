import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import AccountPage from "./pages/AccountPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UnlockAccountPage from "./pages/UnlockAccountPage";
import StartPage from "./pages/StartPage";
import useAuth from "./hooks/useAuth";
import SignupPage from "./pages/SignupPage";

function App() {
  useAuth();

  return (
    // <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/unlockaccount" element={<UnlockAccountPage />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    // </Provider>
  );
}

export default App;
