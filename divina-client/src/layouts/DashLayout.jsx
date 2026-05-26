import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import orangeLogo from '../assets/brand/orange.jpg';
import { dashboardTheme } from '../theme/dashboardTheme';

const dashLinkClass = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition-all duration-200',
    isActive
      ? 'border-neutral-900 bg-neutral-900 text-white shadow-[4px_4px_0px_0px_rgba(251,241,232,1)]'
      : 'border-transparent text-neutral-600 hover:border-neutral-900 hover:bg-white hover:text-neutral-900',
  ].join(' ');

function DashLayout() {
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

            <nav className="flex flex-wrap items-center gap-2">
              <NavLink to="/dashboard" end className={dashLinkClass}>
                Home
              </NavLink>
              <NavLink to="/dashboard/reports" className={dashLinkClass}>
                Reports
              </NavLink>
              <NavLink to="/dashboard/users" className={dashLinkClass}>
                Users
              </NavLink>
              <Link
                to="/"
                className="rounded-full border-2 border-neutral-900 bg-orange-500 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white transition hover:bg-orange-600"
              >
                Back to Site
              </Link>
            </nav>
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
