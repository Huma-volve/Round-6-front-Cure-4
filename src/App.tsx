import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./pages/Profile/PrivacyPolicy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/favorite" element={<FavoritePage />}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
          <Route path="/FAQs" element={<FAQsPage />}></Route>
          <Route path="/" element={<ProfilePage />}></Route>
          <Route path="/edit-profile" element={<EditProfilePage />}></Route>
          <Route path="/payment" element={<PaymentPage />}></Route>
          <Route
            path="/payment-method-card"
            element={<PaymentMethodCard />}
          ></Route>
          <Route path="/add-new-card" element={<AddNewCard />}></Route>
          <Route path="/settings" element={<SettingsPage />}></Route>
          <Route
            path="/password-management"
            element={<PasswordManagementPage />}
          ></Route>
          <Route path="/favorites" element={<FavoritePage />}></Route>
          <Route path="/bookings" element={<BookingsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
