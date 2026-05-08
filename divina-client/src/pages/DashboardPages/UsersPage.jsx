import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TextField,
} from '@mui/material';

const users = [
  { id: 1, name: 'Sebastian Divina', role: 'Premium Member', status: 'Active', email: 'sebastian@petcare.com', pets: 3 },
  { id: 2, name: 'Tristan Sevilla', role: 'Standard Member', status: 'Active', email: 'tristan@petcare.com', pets: 1 },
  { id: 3, name: 'Howard Ocampo', role: 'Premium Member', status: 'Pending', email: 'howard@petcare.com', pets: 2 },
  { id: 4, name: 'Zandra Magpusao', role: 'Standard Member', status: 'Inactive', email: 'zandra@petcare.com', pets: 0 },
  { id: 5, name: 'Gerald Bitago', role: 'Premium Member', status: 'Active', email: 'gerald@petcare.com', pets: 4 },
  { id: 6, name: 'Wendell Aquino', role: 'Standard Member', status: 'Active', email: 'wendell@petcare.com', pets: 2 },
];

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const activeCount = users.filter((user) => user.status === 'Active').length;
  const pendingCount = users.filter((user) => user.status === 'Pending').length;
  const inactiveCount = users.filter((user) => user.status === 'Inactive').length;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#aa3bff';
      case 'Pending':
        return '#ff9800';
      case 'Inactive':
        return '#d32f2f';
      default:
        return '#6b6375';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Active':
        return 'rgba(170, 59, 255, 0.1)';
      case 'Pending':
        return 'rgba(255, 152, 0, 0.1)';
      case 'Inactive':
        return 'rgba(211, 47, 47, 0.1)';
      default:
        return 'rgba(107, 99, 117, 0.1)';
    }
  };

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
          👥 Users & Clients
        </Typography>
        <Typography sx={{ color: '#6b6375', fontSize: 16 }}>
          Manage your client base and view member details.
        </Typography>
      </Box>

      {/* Summary Stats */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
        <Card
          sx={{
            flex: 1,
            backgroundColor: '#fff',
            border: '1px solid #e5e4e7',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px',
          }}
        >
          <CardContent>
            <Typography sx={{ color: '#6b6375', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', mb: 1 }}>
              Active Users
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins, system-ui', fontSize: 36, fontWeight: 600, color: '#aa3bff' }}>
              {activeCount}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            backgroundColor: '#fff',
            border: '1px solid #e5e4e7',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px',
          }}
        >
          <CardContent>
            <Typography sx={{ color: '#6b6375', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', mb: 1 }}>
              Pending
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins, system-ui', fontSize: 36, fontWeight: 600, color: '#ff9800' }}>
              {pendingCount}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            backgroundColor: '#fff',
            border: '1px solid #e5e4e7',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px',
          }}
        >
          <CardContent>
            <Typography sx={{ color: '#6b6375', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', mb: 1 }}>
              Inactive
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins, system-ui', fontSize: 36, fontWeight: 600, color: '#d32f2f' }}>
              {inactiveCount}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Users Table Card */}
      <Card
        sx={{
          backgroundColor: '#fff',
          border: '1px solid #e5e4e7',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px',
        }}
      >
        <CardContent>
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#e5e4e7',
                },
                '&:hover fieldset': {
                  borderColor: '#aa3bff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#aa3bff',
                },
              },
            }}
          />

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(170, 59, 255, 0.05)' }}>
                  <TableCell
                    sx={{
                      fontFamily: 'Poppins, system-ui',
                      fontWeight: 600,
                      color: '#08060d',
                      borderBottom: '2px solid #e5e4e7',
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Poppins, system-ui',
                      fontWeight: 600,
                      color: '#08060d',
                      borderBottom: '2px solid #e5e4e7',
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Poppins, system-ui',
                      fontWeight: 600,
                      color: '#08060d',
                      borderBottom: '2px solid #e5e4e7',
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Poppins, system-ui',
                      fontWeight: 600,
                      color: '#08060d',
                      borderBottom: '2px solid #e5e4e7',
                    }}
                  >
                    Membership
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Poppins, system-ui',
                      fontWeight: 600,
                      color: '#08060d',
                      borderBottom: '2px solid #e5e4e7',
                      textAlign: 'center',
                    }}
                  >
                    Pets
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Poppins, system-ui',
                      fontWeight: 600,
                      color: '#08060d',
                      borderBottom: '2px solid #e5e4e7',
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#fff' : 'rgba(244, 243, 236, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(170, 59, 255, 0.05)',
                      },
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    <TableCell sx={{ color: '#6b6375', fontSize: 14 }}>{user.id}</TableCell>
                    <TableCell
                      sx={{
                        color: '#08060d',
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: 'Poppins, system-ui',
                      }}
                    >
                      {user.name}
                    </TableCell>
                    <TableCell sx={{ color: '#6b6375', fontSize: 14 }}>{user.email}</TableCell>
                    <TableCell sx={{ color: '#6b6375', fontSize: 14 }}>{user.role}</TableCell>
                    <TableCell sx={{ color: '#6b6375', fontSize: 14, textAlign: 'center' }}>
                      🐾 {user.pets}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        sx={{
                          backgroundColor: getStatusBgColor(user.status),
                          color: getStatusColor(user.status),
                          fontWeight: 600,
                          border: `1px solid ${getStatusColor(user.status)}`,
                          fontSize: 12,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredUsers.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: '#6b6375', fontSize: 16 }}>
                No users found matching your search.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
