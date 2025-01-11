import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignppPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AccountPage from "./pages/AccountPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import UnlockAccountPage from "./pages/UnlockAccountPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/signup" />} />
          <Route path="/signup" element={<SignppPage />} />
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
    </Provider>
  );
}

export default App;
