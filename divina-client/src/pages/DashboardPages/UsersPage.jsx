import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const users = [
  { id: 1, name: 'Mia Santos', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Noah Reyes', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Lina Cruz', role: 'Viewer', status: 'Pending' },
  { id: 4, name: 'Alex Kim', role: 'Editor', status: 'Inactive' },
  { id: 5, name: 'Jade Lopez', role: 'Viewer', status: 'Active' },
];

function UsersPage() {
  const activeCount = users.filter((user) => user.status === 'Active').length;
  const pendingCount = users.filter((user) => user.status === 'Pending').length;
  const inactiveCount = users.filter((user) => user.status === 'Inactive').length;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Active Users
            </Typography>
            <Typography variant="h4">{activeCount}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Pending Users
            </Typography>
            <Typography variant="h4">{pendingCount}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Inactive Users
            </Typography>
            <Typography variant="h4">{inactiveCount}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UsersPage;
