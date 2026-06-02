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
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  updateArticle,
} from '../../services/ArticleService';
import {
  brand,
  dashboardCardSx,
  dashboardEyebrowSx,
  dashboardPageTitleSx,
  dashboardSubtitleSx,
} from '../../theme/dashboardTheme';
import { openPrintReport } from '../../utils/printReport';

const imageKeys = ['1', '2', '3', '4', '5'];
const statuses = ['active', 'disabled'];

const emptyForm = {
  slug: '',
  title: '',
  preview: '',
  imageKey: '1',
  status: 'active',
  contentText: '',
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const printRef = useRef(null);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles({ all: true });
      setArticles(data.articles || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const validateForm = () => {
    const errors = {};
    const slug = formData.slug.trim().toLowerCase().replace(/\s+/g, '-');

    if (!slug) errors.slug = 'Slug is required';
    if (!/^[a-z0-9-]+$/.test(slug)) errors.slug = 'Slug must use lowercase letters, numbers, and hyphens only';
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.contentText.trim()) errors.contentText = 'At least one paragraph is required';
    if (!formData.status) errors.status = 'Status is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildPayload = () => {
    const slug = formData.slug.trim().toLowerCase().replace(/\s+/g, '-');
    const content = formData.contentText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    return {
      slug,
      title: formData.title.trim(),
      preview: formData.preview.trim() || content[0] || '',
      imageKey: formData.imageKey,
      status: formData.status,
      content,
    };
  };

  const handleOpenDialog = (article = null) => {
    if (article) {
      setEditingId(article._id);
      setFormData({
        slug: article.slug,
        title: article.title,
        preview: article.preview || '',
        imageKey: article.imageKey || '1',
        status: article.status || 'active',
        contentText: (article.content || []).join('\n'),
      });
    } else {
      setEditingId(null);
      setFormData(emptyForm);
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const payload = buildPayload();
      if (editingId) {
        await updateArticle(editingId, payload);
      } else {
        await createArticle(payload);
      }
      await loadArticles();
      handleCloseDialog();
    } catch (err) {
      setFormErrors({ submit: err.response?.data?.message || 'Failed to save article.' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete article.');
    }
  };

  const handleToggleStatus = async (article) => {
    try {
      const nextStatus = article.status === 'active' ? 'disabled' : 'active';
      await updateArticle(article._id, { status: nextStatus });
      await loadArticles();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const filteredArticles = articles.filter((article) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(searchLower) ||
      article.slug.toLowerCase().includes(searchLower) ||
      (article.preview || '').toLowerCase().includes(searchLower);
    const matchesStatus = !statusFilter || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = articles.filter((article) => article.status === 'active').length;
  const disabledCount = articles.filter((article) => article.status === 'disabled').length;

  const handlePrint = () => {
    if (!printRef.current) return;
    openPrintReport({
      title: 'Articles Report',
      description: 'Care guide articles with slug, preview, paragraph count, and publication status.',
      contentHtml: printRef.current.outerHTML,
    });
  };

  const statCards = [
    { label: 'Total Articles', value: articles.length, color: brand.orange },
    { label: 'Active', value: activeCount, color: brand.orange },
    { label: 'Disabled', value: disabledCount, color: '#dc2626' },
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
          <Typography sx={dashboardEyebrowSx}>Content management</Typography>
          <Typography component="h1" sx={dashboardPageTitleSx}>
            Articles
          </Typography>
          <Typography sx={dashboardSubtitleSx}>
            Manage care guides shown on the public Articles page. Active entries appear on the dog website.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Add Article
          </Button>
          <Button variant="outlined" onClick={handlePrint}>
            Print PDF
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
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
              placeholder="Search by title, slug, or preview..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{ flex: 1 }}
              fullWidth
            />
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} label="Status">
                <MenuItem value="">All Statuses</MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={dashboardCardSx}>
        <CardContent>
          {loading ? (
            <Typography sx={{ color: brand.muted, py: 4, textAlign: 'center' }}>Loading articles…</Typography>
          ) : (
            <div ref={printRef}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Slug</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Paragraphs</TableCell>
                      <TableCell>Preview</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredArticles.map((article, index) => (
                      <TableRow
                        key={article._id}
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#fff' : brand.orangeLight,
                          '&:hover': { backgroundColor: 'rgba(234, 88, 12, 0.08)' },
                        }}
                      >
                        <TableCell sx={{ color: brand.muted, fontFamily: 'monospace' }}>{article.slug}</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: brand.ink }}>{article.title}</TableCell>
                        <TableCell sx={{ color: brand.muted }}>{article.content?.length || 0}</TableCell>
                        <TableCell sx={{ color: brand.muted, maxWidth: 280 }}>
                          <Typography noWrap title={article.preview}>
                            {article.preview}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={article.status === 'active' ? 'Active' : 'Disabled'}
                            sx={{
                              backgroundColor:
                                article.status === 'active' ? brand.orangeLight : 'rgba(220, 38, 38, 0.1)',
                              color: article.status === 'active' ? brand.orange : '#dc2626',
                              fontWeight: 700,
                              border: `2px solid ${article.status === 'active' ? brand.orange : '#dc2626'}`,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button size="small" onClick={() => handleOpenDialog(article)} sx={{ mr: 1 }}>
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color={article.status === 'active' ? 'warning' : 'success'}
                            onClick={() => handleToggleStatus(article)}
                            sx={{ mr: 1 }}
                          >
                            {article.status === 'active' ? 'Disable' : 'Enable'}
                          </Button>
                          <Button size="small" color="error" onClick={() => handleDelete(article._id)}>
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

          {!loading && filteredArticles.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: brand.muted }}>No articles found matching your search or filters.</Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 900 }}>{editingId ? 'Edit Article' : 'Add Article'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {formErrors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formErrors.submit}
            </Alert>
          )}

          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleFormChange}
              error={!!formErrors.slug}
              helperText={formErrors.slug || 'e.g. puppy-training-basics'}
              fullWidth
            />
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              error={!!formErrors.title}
              helperText={formErrors.title}
              fullWidth
            />
            <TextField
              label="Preview"
              name="preview"
              value={formData.preview}
              onChange={handleFormChange}
              helperText="Optional — defaults to first paragraph"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Cover Image</InputLabel>
              <Select name="imageKey" value={formData.imageKey} onChange={handleFormChange} label="Cover Image">
                {imageKeys.map((key) => (
                  <MenuItem key={key} value={key}>
                    Card image {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth error={!!formErrors.status}>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={formData.status} onChange={handleFormChange} label="Status">
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Paragraphs"
              name="contentText"
              value={formData.contentText}
              onChange={handleFormChange}
              error={!!formErrors.contentText}
              helperText={formErrors.contentText || 'One paragraph per line'}
              fullWidth
              multiline
              rows={6}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashArticleListPage;
