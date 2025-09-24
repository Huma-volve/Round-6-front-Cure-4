import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ContactPage from './pages/Contact/ContactPage';
import NotificationsPage from './pages/Notifications/NotificationsPage';


function App() {
  return (
    <Routes>
      {/* الصفحة الرئيسية */}
      <Route path="/" element={<HomePage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="notifications" element={<NotificationsPage />} />
    </Routes>
  );
}

export default App;
