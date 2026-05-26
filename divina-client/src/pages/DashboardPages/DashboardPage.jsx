import React from 'react';
import { Box, Card, CardContent, LinearProgress, Stack, Typography } from '@mui/material';
import {
  brand,
  dashboardCardSx,
  dashboardEyebrowSx,
  dashboardPageTitleSx,
  dashboardSubtitleSx,
} from '../../theme/dashboardTheme';

function DashboardPage() {
  const stats = [
    { label: 'Total Users', value: '1,248', growth: '+12%' },
    { label: 'Active Sessions', value: '384', growth: '+8%' },
    { label: 'Appointments', value: '156', growth: '+24%' },
    { label: 'Revenue', value: '$12,450', growth: '+18%' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography sx={dashboardEyebrowSx}>Pet care overview</Typography>
        <Typography component="h1" sx={dashboardPageTitleSx}>
          Dashboard
        </Typography>
        <Typography sx={dashboardSubtitleSx}>
          Welcome back. Track clients, appointments, and business performance from one place.
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Card key={stat.label} sx={dashboardCardSx}>
            <CardContent>
              <Typography
                sx={{
                  color: brand.muted,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.28em',
                  mb: 1,
                }}
              >
                {stat.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1.5 }}>
                <Typography sx={{ fontSize: 32, fontWeight: 900, color: brand.ink }}>{stat.value}</Typography>
                <Typography sx={{ color: brand.orange, fontSize: 14, fontWeight: 800 }}>{stat.growth}</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{
                  height: 6,
                  borderRadius: 999,
                  backgroundColor: '#e5e5e5',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: brand.orange,
                    borderRadius: 999,
                  },
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Card
        sx={{
          ...dashboardCardSx,
          backgroundColor: brand.orangeLight,
          border: `2px solid ${brand.border}`,
          boxShadow: '12px 12px 0px 0px rgba(234, 88, 12, 0.15)',
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 22, fontWeight: 900, color: brand.ink, mb: 1 }}>
            Manage your pet care business
          </Typography>
          <Typography sx={{ color: brand.muted, lineHeight: 1.7 }}>
            Use Reports for analytics and printable summaries, and Users to search, filter, and manage your client
            directory with validated forms.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
