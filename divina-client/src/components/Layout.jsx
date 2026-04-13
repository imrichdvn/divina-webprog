// Layout.jsx
import { Outlet } from "react-router-dom";
import NavBar from "./shared/Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    // Use stone-50 for a warmer, pet-friendly feel than cold zinc-100
    <div className="flex min-h-screen flex-col bg-stone-50 text-neutral-900 selection:bg-orange-200">
      <NavBar />
      {/* pt-24 ensures content isn't hidden behind the fixed header */}
      <main className="flex-grow pt-24 pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;