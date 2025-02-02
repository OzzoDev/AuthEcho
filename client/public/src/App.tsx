import { RouterProvider } from "react-router";
import router from "./router/Router";
import useAuth from "./hooks/useAuth";

function App() {
  useAuth();

  return <RouterProvider router={router} />;
  // <Router>
  //   <>
  //     <Navbar />
  //     <Routes>
  //       <Route path="/" element={<StartPage />} />
  //       <Route path="/signup" element={<SignupPage />} />
  //       <Route path="/signin" element={<SigninPage />} />
  //       <Route path="/resetPassword" element={<ResetPasswordPage />} />
  //       <Route path="/unlockaccount" element={<UnlockAccountPage />} />
  //       <Route path="/connectapp" element={<ConnectAppPage />} />
  //       <Route
  //         path="/account"
  //         element={
  //           <ProtectedRoute>
  //             <AccountPage />
  //           </ProtectedRoute>
  //         }
  //       />
  //     </Routes>
  //   </>
  // </Router>
}

export default App;
