import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivacyPolicy from "./pages/Profile/PrivacyPolicy";

import FAQsPage from "./pages/Profile/FAQsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfilePage from "./pages/Profile/EditProfilePage";
import PaymentPage from "./pages/Profile/PaymentPage";
import FavoritePage from "./pages/Favorite/FavoritePage";
import SettingsPage from "./pages/Profile/SettingsPage";
import PasswordManagementPage from "./pages/Profile/PasswordManagementPage";
import PaymentMethodCard from "./pages/Profile/PaymentMethodCard";
import AddNewCard from "./pages/Profile/AddNewCard";
import BookingsPage from "./pages/Bookings/BookingsPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AuthLayout from "./pages/AuthLayout";
import Layout from "./pages/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AuthProvider from "./context/AuthProvider";
import SendOTP from "./pages/Auth/SendOTP";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResetPassword from "./pages/Auth/ResetPassword";

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
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/favorite",
      element: <FavoritePage />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/FAQs",
      element: <FAQsPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/edit-profile",
      element: <EditProfilePage />,
    },
    {
      path: "/payment",
      element: <PaymentPage />,
    },
    {
      path: "/payment-method-card",
      element: <PaymentMethodCard />,
    },
    {
      path: "/add-new-card",
      element: <AddNewCard />,
    },

    {
      path: "/settings",
      element: <SettingsPage />,
    },
    {
      path: "/password-management",
      element: <PasswordManagementPage />,
    },
    {
      path: "/favorites",
      element: <FavoritePage />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/bookings",
      element: <BookingsPage />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
