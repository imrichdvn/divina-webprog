import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

const reportSummary = [
  { label: 'Completed Services', value: 156, icon: '✓', color: '#aa3bff' },
  { label: 'Pending Requests', value: 24, icon: '⏳', color: '#aa3bff' },
  { label: 'Client Satisfaction', value: '98%', icon: '⭐', color: '#aa3bff' },
];

const chartData = [
  { label: 'Jan', grooming: 18, training: 12, boarding: 8 },
  { label: 'Feb', grooming: 22, training: 16, boarding: 14 },
  { label: 'Mar', grooming: 28, training: 20, boarding: 18 },
  { label: 'Apr', grooming: 24, training: 18, boarding: 16 },
  { label: 'May', grooming: 32, training: 24, boarding: 22 },
  { label: 'Jun', grooming: 29, training: 21, boarding: 19 },
];

const services = [
  { name: 'Grooming', color: '#aa3bff', value: 153 },
  { name: 'Training', color: '#ff6b9d', value: 111 },
  { name: 'Boarding', value: 97 },
];

function ReportsPage() {
  const maxValue = 35;

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
          Reports & Analytics
        </Typography>
        <Typography sx={{ color: '#6b6375', fontSize: 16 }}>
          Track your business performance and service metrics.
        </Typography>
      </Box>

      {/* Summary Stats */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
        {reportSummary.map((summary) => (
          <Card
            key={summary.label}
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography sx={{ fontSize: 24 }}>{summary.icon}</Typography>
                <Typography
                  sx={{
                    color: '#6b6375',
                    fontSize: 13,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  {summary.label}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Poppins, system-ui',
                  fontSize: 36,
                  fontWeight: 600,
                  color: summary.color,
                }}
              >
                {summary.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Charts */}
      <Stack spacing={3}>
        {/* Bar Chart - Services Over Time */}
        <Card sx={{ backgroundColor: '#fff', border: '1px solid #e5e4e7', boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px' }}>
          <CardContent>
            <Typography
              sx={{
                fontFamily: 'Poppins, system-ui',
                fontSize: 18,
                fontWeight: 600,
                color: '#08060d',
                mb: 3,
              }}
            >
              📊 Monthly Services Trend
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-end', minHeight: 200, overflowX: 'auto', pb: 2 }}>
              {chartData.map((item) => (
                <Box key={item.label} sx={{ textAlign: 'center', flex: '0 0 auto' }}>
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-end', justifyContent: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: `${(item.grooming / maxValue) * 160}px`,
                        backgroundColor: '#aa3bff',
                        borderRadius: '2px 2px 0 0',
                      }}
                    />
                    <Box
                      sx={{
                        width: 12,
                        height: `${(item.training / maxValue) * 160}px`,
                        backgroundColor: 'rgba(170, 59, 255, 0.5)',
                        borderRadius: '2px 2px 0 0',
                      }}
                    />
                    <Box
                      sx={{
                        width: 12,
                        height: `${(item.boarding / maxValue) * 160}px`,
                        backgroundColor: 'rgba(170, 59, 255, 0.2)',
                        borderRadius: '2px 2px 0 0',
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: 12, color: '#6b6375', fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Legend */}
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mt: 3, flexWrap: 'wrap' }}>
              {services.map((service) => (
                <Box key={service.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: service.color, borderRadius: '2px' }} />
                  <Typography sx={{ fontSize: 13, color: '#6b6375' }}>
                    {service.name} ({service.value})
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card sx={{ backgroundColor: '#fff', border: '1px solid #e5e4e7', boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px' }}>
          <CardContent>
            <Typography
              sx={{
                fontFamily: 'Poppins, system-ui',
                fontSize: 18,
                fontWeight: 600,
                color: '#08060d',
                mb: 3,
              }}
            >
              🎯 Service Distribution
            </Typography>

            {services.map((service) => {
              const percentage = (service.value / (153 + 111 + 97)) * 100;
              return (
                <Box key={service.name} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: '#08060d', fontWeight: 500 }}>
                      {service.name}
                    </Typography>
                    <Typography sx={{ color: service.color, fontWeight: 600 }}>
                      {service.value} ({percentage.toFixed(1)}%)
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 8,
                      backgroundColor: '#e5e4e7',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${percentage}%`,
                        backgroundColor: service.color,
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
