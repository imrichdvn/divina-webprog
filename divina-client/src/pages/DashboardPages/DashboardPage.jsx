import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Home
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Welcome to your dashboard</Typography>
            <Typography color="text.secondary">
              Use the links above to access reports and users.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Dashboard overview</Typography>
            <Typography color="text.secondary">
              This is the dashboard landing page for your admin panel.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default DashboardPage;
