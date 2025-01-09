import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignppPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AccountPage from "./pages/AccountPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/signup" />} />
        <Route path="/signup" element={<SignppPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
