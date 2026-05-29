import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import orangeLogo from '../assets/brand/orange.jpg';
import { dashboardTheme } from '../theme/dashboardTheme';
import { clearAuth, getAuth } from '../utils/auth';

const dashLinkClass = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition-all duration-200',
    isActive
      ? 'border-neutral-900 bg-neutral-900 text-white shadow-[4px_4px_0px_0px_rgba(251,241,232,1)]'
      : 'border-transparent text-neutral-600 hover:border-neutral-900 hover:bg-white hover:text-neutral-900',
  ].join(' ');

function DashLayout() {
  const navigate = useNavigate();
  const { firstName, type } = getAuth();
  const isAdmin = type === 'admin';

  const handleLogout = () => {
    clearAuth();
    navigate('/auth/signin');
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box className="min-h-screen bg-stone-50 text-neutral-900">
        <header className="sticky top-0 z-50 border-b-2 border-neutral-900 bg-stone-50/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link to="/" className="group flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl border-2 border-neutral-900 bg-white transition-transform group-hover:-rotate-6">
                <img src={orangeLogo} alt="Paws and Claws logo" className="h-full w-full object-contain p-1" />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-lg font-black tracking-[0.12em] text-neutral-900 sm:text-xl">PAWS & CLAWS</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-600">Dashboard</p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              {firstName && (
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Welcome, <span className="text-neutral-900">{firstName}</span>
                  {type && (
                    <span className="ml-2 rounded-full border border-neutral-900 px-2 py-0.5 text-orange-600">
                      {type}
                    </span>
                  )}
                </p>
              )}

              <nav className="flex flex-wrap items-center gap-2">
                <NavLink to="/dashboard" end className={dashLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/dashboard/reports" className={dashLinkClass}>
                  Reports
                </NavLink>
                <NavLink to="/dashboard/articles" className={dashLinkClass}>
                  Articles
                </NavLink>
                {isAdmin && (
                  <NavLink to="/dashboard/users" className={dashLinkClass}>
                    Users
                  </NavLink>
                )}
                <Link
                  to="/"
                  className="rounded-full border-2 border-neutral-900 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-900 transition hover:bg-orange-50"
                >
                  Back to Site
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border-2 border-neutral-900 bg-orange-500 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white transition hover:bg-orange-600"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </header>

        <Box component="main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashLayout;
