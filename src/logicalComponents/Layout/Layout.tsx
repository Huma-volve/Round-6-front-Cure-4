import Footer from "@/pages/Footer";
import Navbar from "@/pages/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-1 py-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
