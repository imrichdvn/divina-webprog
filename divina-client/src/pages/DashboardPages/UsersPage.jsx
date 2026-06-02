import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
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
} from '@mui/material';
import { createUser, deleteUser, fetchUsers, updateUser } from '../../services/UserService';
import {
  brand,
  dashboardCardSx,
  dashboardEyebrowSx,
  dashboardPageTitleSx,
  dashboardSubtitleSx,
} from '../../theme/dashboardTheme';
import { openPrintReport } from '../../utils/printReport';

const roles = ['admin', 'editor', 'user'];
const genders = ['male', 'female', 'other'];

const mapUserFromApi = (user) => ({
  ...user,
  id: user._id,
  role: user.type,
});

const mapUserToApi = (formData) => {
  const { id, role, ...rest } = formData;
  return { ...rest, type: role };
};

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const printRef = useRef(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers((data.users || []).map(mapUserFromApi));
      setPageError('');
    } catch (err) {
      setPageError(err.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

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
    const ageValue = Number(formData.age);

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.age) errors.age = 'Age is required';
    if (!/^\d+$/.test(String(formData.age))) errors.age = 'Age must be a number only';
    if (!errors.age && (ageValue < 18 || ageValue > 120)) errors.age = 'Age must be between 18 and 120';
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
      setFormData({ ...user, password: '' });
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

  const handleSaveUser = async () => {
    if (!validateForm()) return;

    try {
      const payload = mapUserToApi(formData);
      if (editingId) {
        if (!payload.password) {
          delete payload.password;
        }
        await updateUser(editingId, payload);
      } else {
        await createUser(payload);
      }
      await loadUsers();
      handleCloseDialog();
    } catch (err) {
      setFormErrors({ submit: err.response?.data?.message || 'Failed to save user.' });
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (err) {
      setPageError(err.response?.data?.message || 'Failed to delete user.');
    }
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
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
    if (!printRef.current) return;

    openPrintReport({
      title: 'Users & Members Report',
      description: 'Filtered user directory with roles, contact information, and membership status.',
      contentHtml: printRef.current.outerHTML,
    });
  };

  const statCards = [
    { label: 'Total Users', value: users.length, color: brand.orange },
    { label: 'Active', value: activeCount, color: brand.orange },
    { label: 'Inactive', value: inactiveCount, color: '#dc2626' },
    { label: 'Admins', value: adminCount, color: brand.ink },
  ];

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography sx={dashboardEyebrowSx}>Client directory</Typography>
          <Typography component="h1" sx={dashboardPageTitleSx}>
            Users & Clients
          </Typography>
          <Typography sx={dashboardSubtitleSx}>Manage your client base, search members, and export printable lists.</Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Add User
          </Button>
          <Button variant="outlined" onClick={handlePrint}>
            Print PDF
          </Button>
        </Stack>
      </Stack>

      {pageError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {pageError}
        </Alert>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        {statCards.map((stat) => (
          <Card key={stat.label} sx={{ ...dashboardCardSx, flex: 1 }}>
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
              <Typography sx={{ fontSize: 36, fontWeight: 900, color: stat.color }}>{stat.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Card sx={{ ...dashboardCardSx, mb: 3 }}>
        <CardContent>
          <Typography sx={{ fontWeight: 800, color: brand.ink, mb: 2 }}>Search & Filters</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              placeholder="Search by first name, last name, email, or username..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{ flex: 1 }}
              fullWidth
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Role</InputLabel>
              <Select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} label="Role">
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
              <Select value={genderFilter} onChange={(event) => setGenderFilter(event.target.value)} label="Gender">
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
              <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} label="Status">
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={dashboardCardSx}>
        <CardContent>
          {loading ? (
            <Typography sx={{ color: brand.muted, py: 4, textAlign: 'center' }}>Loading users…</Typography>
          ) : (
          <div ref={printRef}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#fff' : brand.orangeLight,
                        '&:hover': { backgroundColor: 'rgba(234, 88, 12, 0.08)' },
                      }}
                    >
                      <TableCell sx={{ color: brand.muted }}>{user.id}</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: brand.ink }}>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell sx={{ color: brand.muted }}>{user.email}</TableCell>
                      <TableCell sx={{ color: brand.muted, textTransform: 'capitalize' }}>{user.role}</TableCell>
                      <TableCell sx={{ color: brand.muted, textTransform: 'capitalize' }}>{user.gender}</TableCell>
                      <TableCell sx={{ color: brand.muted }}>{user.age}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.isActive ? 'Active' : 'Inactive'}
                          sx={{
                            backgroundColor: user.isActive ? brand.orangeLight : 'rgba(220, 38, 38, 0.1)',
                            color: user.isActive ? brand.orange : '#dc2626',
                            fontWeight: 700,
                            border: `2px solid ${user.isActive ? brand.orange : '#dc2626'}`,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
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
          )}

          {!loading && filteredUsers.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: brand.muted }}>No users found matching your search or filters.</Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 900 }}>{editingId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {formErrors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formErrors.submit}
            </Alert>
          )}
          {Object.entries(formErrors).some(([key, value]) => value && key !== 'submit') && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Please fix the errors below before saving.
            </Alert>
          )}

          <Stack spacing={2} sx={{ mt: 1 }}>
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
              value={formData.age}
              onChange={handleFormChange}
              error={!!formErrors.age}
              helperText={formErrors.age || 'Numbers only'}
              fullWidth
            />
            <FormControl fullWidth error={!!formErrors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={formData.gender} onChange={handleFormChange} label="Gender">
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.gender && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {formErrors.gender}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleFormChange}
              error={!!formErrors.contactNumber}
              helperText={formErrors.contactNumber || 'Must be exactly 11 digits'}
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
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.role && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {formErrors.role}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              error={!!formErrors.username}
              helperText={formErrors.username || 'No spaces allowed'}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleFormChange}
              error={!!formErrors.password}
              helperText={formErrors.password || (editingId ? 'Leave blank to keep current password' : 'At least 8 characters')}
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
              <Typography sx={{ fontSize: 14 }}>Active user</Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage;
