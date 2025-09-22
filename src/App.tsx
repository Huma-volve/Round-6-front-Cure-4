import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AuthLayout from "./pages/AuthLayout";
import Layout from './pages/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AuthProvider from "./context/AuthProvider";
import SendOTP from "./pages/Auth/SendOTP";
import VerifyOTP from './pages/Auth/VerifyOTP';
import ResetPassword from './pages/Auth/ResetPassword';
import Profile from "./pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "sendOtp", element: <SendOTP /> },
        { path: "verifyOtp", element: <VerifyOTP /> },
        { path: "resetOtp", element: <ResetPassword /> },
      ],
    },
    {
      path: "/home",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {path:"profile" , element:<Profile/>},
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;