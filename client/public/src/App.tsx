import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignppPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AccountPage from "./pages/AccountPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import UnlockAccountPage from "./pages/UnlockAccountPage";
import StartPage from "./pages/StartPage";
import { useEffect } from "react";
import { verifyAuthentication } from "./utils/ServerClient";
import { sessionStore } from "./utils/utils";
import { AUTH_KEY } from "./constants/contants";

function App() {
  // useEffect(() => {
  //   const authenticate = async () => {
  //     const response = await verifyAuthentication();
  //     if (response) {
  //       sessionStore(AUTH_KEY, true);
  //     }
  //   };

  //   authenticate();
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
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
