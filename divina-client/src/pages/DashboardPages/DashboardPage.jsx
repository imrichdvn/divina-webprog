import React from 'react';
import { Box, Card, CardContent, Stack, Typography, LinearProgress } from '@mui/material';

function DashboardPage() {
  const stats = [
    { label: 'Total Users', value: 1248, growth: '+12%', color: '#aa3bff' },
    { label: 'Active Sessions', value: 384, growth: '+8%', color: '#aa3bff' },
    { label: 'Appointments', value: 156, growth: '+24%', color: '#aa3bff' },
    { label: 'Revenue', value: '$12,450', growth: '+18%', color: '#aa3bff' },
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: 'Poppins, system-ui',
            fontSize: 40,
            fontWeight: 600,
            color: '#08060d',
            letterSpacing: '-1px',
            mb: 1,
          }}
        >
          Dashboard
        </Typography>
        <Typography sx={{ color: '#6b6375', fontSize: 16 }}>
          Welcome back! Here's your pet care business overview.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
        {stats.map((stat) => (
          <Card
            key={stat.label}
            sx={{
              flex: 1,
              backgroundColor: '#fff',
              border: '1px solid #e5e4e7',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 'rgba(170, 59, 255, 0.15) 0 20px 25px -5px',
              },
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color: '#6b6375',
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 1,
                }}
              >
                {stat.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                <Typography
                  sx={{
                    fontFamily: 'Poppins, system-ui',
                    fontSize: 32,
                    fontWeight: 600,
                    color: '#08060d',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ color: stat.color, fontSize: 14, fontWeight: 600 }}>
                  {stat.growth}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{
                  height: 4,
                  backgroundColor: '#e5e4e7',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: stat.color,
                  },
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Welcome Card */}
      <Card
        sx={{
          backgroundColor: 'rgba(170, 59, 255, 0.05)',
          border: '1px solid rgba(170, 59, 255, 0.2)',
          boxShadow: 'none',
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontFamily: 'Poppins, system-ui',
              fontSize: 20,
              fontWeight: 600,
              color: '#08060d',
              mb: 1,
            }}
          >
            🐾 Manage Your Pet Care Business
          </Typography>
          <Typography sx={{ color: '#6b6375', lineHeight: 1.6 }}>
            Track your clients, manage appointments, and view detailed reports. Use the navigation
            above to explore Reports for analytics and Users to manage your customer base.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
