import React from 'react';
import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

const reportSummary = [
  { label: 'Open Tickets', value: 18 },
  { label: 'Closed Tickets', value: 42 },
  { label: 'Pending Reviews', value: 9 },
];

const chartData = [
  { label: 'Jan', value: 12 },
  { label: 'Feb', value: 18 },
  { label: 'Mar', value: 23 },
  { label: 'Apr', value: 16 },
  { label: 'May', value: 27 },
];

function ReportsPage() {
  const maxValue = Math.max(...chartData.map((item) => item.value));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3}>
        {reportSummary.map((summary) => (
          <Card key={summary.label} sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {summary.label}
              </Typography>
              <Typography variant="h4">{summary.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Monthly Activity
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', mt: 2, minHeight: 180 }}>
            {chartData.map((item) => {
              const height = (item.value / maxValue) * 100;
              return (
                <Box key={item.label} sx={{ textAlign: 'center', width: '100%' }}>
                  <Box
                    sx={{
                      mx: 'auto',
                      width: 32,
                      height: `${height}%`,
                      minHeight: 24,
                      bgcolor: 'primary.main',
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary">
            This chart shows a simple report of monthly activity counts.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ReportsPage;
