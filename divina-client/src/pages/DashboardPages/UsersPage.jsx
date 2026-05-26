import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import usersData from '../../data/users.json';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

function UsersPage() {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const printRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: '',
    username: '',
    password: '',
    address: '',
    isActive: true,
  });

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.age) errors.age = 'Age is required';
    if (!/^\d+$/.test(formData.age)) errors.age = 'Age must be a number only';
    if (formData.age < 18 || formData.age > 120) errors.age = 'Age must be between 18 and 120';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.contactNumber) errors.contactNumber = 'Contact number is required';
    if (!/^\d{11}$/.test(formData.contactNumber)) errors.contactNumber = 'Contact number must be 11 digits';
    if (!formData.email) errors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.role) errors.role = 'Role is required';
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (formData.username.includes(' ')) errors.username = 'Username must not contain spaces';
    if (!editingId && !formData.password) errors.password = 'Password is required';
    if (formData.password && formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (!formData.address.trim()) errors.address = 'Address is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingId(user.id);
      setFormData(user);
    } else {
      setEditingId(null);
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        email: '',
        role: '',
        username: '',
        password: '',
        address: '',
        isActive: true,
      });
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormErrors({});
  };

  const handleSaveUser = () => {
    if (!validateForm()) return;

    if (editingId) {
      setUsers(users.map((u) => (u.id === editingId ? { ...formData, id: editingId } : u)));
    } else {
      const newUser = { ...formData, id: Math.max(...users.map((u) => u.id), 0) + 1 };
      setUsers([...users, newUser]);
    }

    handleCloseDialog();
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower);

    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesGender = !genderFilter || user.gender === genderFilter;
    const matchesStatus = !statusFilter || (statusFilter === 'active' ? user.isActive : !user.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const activeCount = users.filter((user) => user.isActive).length;
  const inactiveCount = users.filter((user) => !user.isActive).length;
  const adminCount = users.filter((user) => user.role === 'admin').length;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Users Report</title>
    ${headMarkup}
    <style>
      @page {
        size: A4;
        margin: 16mm;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        background: #fff;
        color: #1f2937;
      }

      .report-shell {
        padding: 28px;
      }

      .report-header {
        margin-bottom: 24px;
        padding-bottom: 14px;
        border-bottom: 1px solid #d1d5db;
      }

      .report-header h1 {
        margin: 0 0 6px;
        font-size: 28px;
        font-weight: 700;
      }

      .report-header p {
        margin: 0;
        font-size: 14px;
        color: #6b7280;
        line-height: 1.5;
      }

      .report-content table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      .report-content th,
      .report-content td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
        font-size: 12px;
      }

      .report-content th {
        background-color: #f3f4f6;
        font-weight: 600;
        color: #1f2937;
      }

      .report-content tr:nth-child(even) {
        background-color: #f9fafb;
      }
    </style>
  </head>
  <body>
    <main class="report-shell">
      <header class="report-header">
        <h1>Users & Members Report</h1>
        <p>Complete user directory with roles, contact information, and membership status.</p>
        <p>Prepared on ${exportedAt}</p>
      </header>
      <section class="report-content">
        ${printContent.outerHTML}
      </section>
    </main>
  </body>
</html>`);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const getStatusColor = (isActive) => (isActive ? '#aa3bff' : '#d32f2f');
  const getStatusBgColor = (isActive) => (isActive ? 'rgba(170, 59, 255, 0.1)' : 'rgba(211, 47, 47, 0.1)');

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
      {/* Header with Print Button */}
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 4 }}>
        <Box>
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

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Add User
          </Button>
          <Button variant="outlined" onClick={handlePrint}>
            Print
          </Button>
        </Stack>
      </Stack>

      {/* Summary Stats */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
        <Card sx={{ flex: 1, backgroundColor: '#fff', border: '1px solid #e5e4e7', boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px' }}>
          <CardContent>
            <Typography sx={{ color: '#6b6375', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', mb: 1 }}>
              Total Users
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins, system-ui', fontSize: 36, fontWeight: 600, color: '#aa3bff' }}>
              {users.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, backgroundColor: '#fff', border: '1px solid #e5e4e7', boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px' }}>
          <CardContent>
            <Typography sx={{ color: '#6b6375', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', mb: 1 }}>
              Active
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins, system-ui', fontSize: 36, fontWeight: 600, color: '#aa3bff' }}>
              {activeCount}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, backgroundColor: '#fff', border: '1px solid #e5e4e7', boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px' }}>
          <CardContent>
            <Typography sx={{ color: '#6b6375', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', mb: 1 }}>
              Inactive
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins, system-ui', fontSize: 36, fontWeight: 600, color: '#d32f2f' }}>
              {inactiveCount}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, backgroundColor: '#fff', border: '1px solid #e5e4e7', boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px' }}>
          <CardContent>
            <Typography sx={{ color: '#6b6375', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', mb: 1 }}>
              Admins
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins, system-ui', fontSize: 36, fontWeight: 600, color: '#ff9800' }}>
              {adminCount}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Search and Filters Card */}
      <Card sx={{ backgroundColor: '#fff', border: '1px solid #e5e4e7', boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px', mb: 3 }}>
        <CardContent>
          <Typography sx={{ fontWeight: 600, color: '#08060d', mb: 2 }}>Search & Filters</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              placeholder="Search by firstName, lastName, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1 }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Role</InputLabel>
              <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} label="Role">
                <MenuItem value="">All Roles</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Gender</InputLabel>
              <Select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} label="Gender">
                <MenuItem value="">All Genders</MenuItem>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card sx={{ backgroundColor: '#fff', border: '1px solid #e5e4e7', boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px' }}>
        <CardContent>
          <div ref={printRef}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'rgba(170, 59, 255, 0.05)' }}>
                    <TableCell sx={{ fontFamily: 'Poppins, system-ui', fontWeight: 600, color: '#08060d', borderBottom: '2px solid #e5e4e7' }}>
                      ID
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, system-ui', fontWeight: 600, color: '#08060d', borderBottom: '2px solid #e5e4e7' }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, system-ui', fontWeight: 600, color: '#08060d', borderBottom: '2px solid #e5e4e7' }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, system-ui', fontWeight: 600, color: '#08060d', borderBottom: '2px solid #e5e4e7' }}>
                      Role
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, system-ui', fontWeight: 600, color: '#08060d', borderBottom: '2px solid #e5e4e7' }}>
                      Gender
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, system-ui', fontWeight: 600, color: '#08060d', borderBottom: '2px solid #e5e4e7' }}>
                      Age
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, system-ui', fontWeight: 600, color: '#08060d', borderBottom: '2px solid #e5e4e7' }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, system-ui', fontWeight: 600, color: '#08060d', borderBottom: '2px solid #e5e4e7', textAlign: 'center' }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#fff' : 'rgba(244, 243, 236, 0.3)',
                        '&:hover': { backgroundColor: 'rgba(170, 59, 255, 0.05)' },
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <TableCell sx={{ color: '#6b6375', fontSize: 14 }}>{user.id}</TableCell>
                      <TableCell sx={{ color: '#08060d', fontSize: 14, fontWeight: 500, fontFamily: 'Poppins, system-ui' }}>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell sx={{ color: '#6b6375', fontSize: 14 }}>{user.email}</TableCell>
                      <TableCell sx={{ color: '#6b6375', fontSize: 14 }}>{user.role}</TableCell>
                      <TableCell sx={{ color: '#6b6375', fontSize: 14 }}>{user.gender}</TableCell>
                      <TableCell sx={{ color: '#6b6375', fontSize: 14 }}>{user.age}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.isActive ? 'Active' : 'Inactive'}
                          sx={{
                            backgroundColor: getStatusBgColor(user.isActive),
                            color: getStatusColor(user.isActive),
                            fontWeight: 600,
                            border: `1px solid ${getStatusColor(user.isActive)}`,
                            fontSize: 12,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Button size="small" onClick={() => handleOpenDialog(user)} sx={{ mr: 1 }}>
                          Edit
                        </Button>
                        <Button size="small" color="error" onClick={() => handleDeleteUser(user.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {filteredUsers.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: '#6b6375', fontSize: 16 }}>
                No users found matching your search.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {Object.values(formErrors).some((err) => err) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Please fix the errors below
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              fullWidth
            />
            <TextField
              label="Age"
              name="age"
              type="text"
              value={formData.age}
              onChange={handleFormChange}
              error={!!formErrors.age}
              helperText={formErrors.age}
              fullWidth
            />
            <FormControl fullWidth error={!!formErrors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={formData.gender} onChange={handleFormChange} label="Gender">
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleFormChange}
              error={!!formErrors.contactNumber}
              helperText={formErrors.contactNumber}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              fullWidth
            />
            <FormControl fullWidth error={!!formErrors.role}>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formData.role} onChange={handleFormChange} label="Role">
                {roles.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleFormChange}
              error={!!formErrors.password}
              helperText={formErrors.password || (editingId ? 'Leave blank to keep current' : 'Min 8 characters')}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
              fullWidth
              multiline
              rows={2}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleFormChange} />
              <Typography sx={{ fontSize: 14 }}>Active User</Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage;
