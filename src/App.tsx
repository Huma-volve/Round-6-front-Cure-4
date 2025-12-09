import Appointment from "./pages/Appointment/Appointment";
import Layout from "./logicalComponents/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import AuthLayout from "./pages/AuthLayout";
// import Layout from "./pages/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AuthProvider from "./context/AuthProvider";
import SendOTP from "./pages/Auth/SendOTP";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResetPassword from "./pages/Auth/ResetPassword";

import Map from "./pages/Search/map";
import Search from "./pages/Search/search";
import HomePage from "./pages/Home/HomePage";
import ContactPage from "./pages/Contact/ContactPage";
import NotificationsPage from "./pages/Notifications/NotificationsPage";

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
      path: "/",
      element: <Layout />,
      children: [
        { index: true, path: "home", element: <HomePage /> },
        {
          path: "bookings",
          element: <BookingsPage />,
        },
        {
          path: "favorite",
          element: <FavoritePage />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "FAQs",
          element: <FAQsPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "edit-profile",
          element: <EditProfilePage />,
        },
        {
          path: "payment",
          element: <PaymentPage />,
        },
        {
          path: "payment-method-card",
          element: <PaymentMethodCard />,
        },
        {
          path: "add-new-card",
          element: <AddNewCard />,
        },

        {
          path: "settings",
          element: <SettingsPage />,
        },
        {
          path: "password-management",
          element: <PasswordManagementPage />,
        },
        {
          path: "favorites",
          element: <FavoritePage />,
        },

        {
          path: "*",
          element: <NotFound />,
        },

        {
          path: "/search/:query",
          element: <Search />,
        },
        {
          path: "map",
          element: <Map />,
        },
        {
          path: "appointment",
          element: <Appointment />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "notifications",
          element: <NotificationsPage />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
