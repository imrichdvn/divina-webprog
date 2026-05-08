import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

function DashLayout() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/dashboard/reports">
            Reports
          </Button>
          <Button color="inherit" component={Link} to="/dashboard/users">
            Users
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashLayout;
