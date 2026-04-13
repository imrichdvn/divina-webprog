import { Outlet } from "react-router-dom";
import NavBar from "./shared/Navbar";
import Footer from "./Footer"; // Import here

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="flex-grow pb-16 pt-20">
        <Outlet />
      </main>
      <Footer /> {/* Add here */}
    </div>
  );
};

export default Layout;
