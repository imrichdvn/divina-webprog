import { Outlet } from 'react-router-dom';
import NavBar from '../components/shared/Navbar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-neutral-900 selection:bg-orange-200">
      <NavBar />
      <main className="flex-grow pt-24 pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
