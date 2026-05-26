import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import {
  brand,
  dashboardCardSx,
  dashboardEyebrowSx,
  dashboardPageTitleSx,
  dashboardSubtitleSx,
} from '../../theme/dashboardTheme';
import { openPrintReport } from '../../utils/printReport';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (_value, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
  },
];

const rows = [
  { id: 1, lastName: 'Divina', firstName: 'Rich', age: 22 },
  { id: 2, lastName: 'Sevilla', firstName: 'Jay', age: 21 },
  { id: 3, lastName: 'Ocampo', firstName: 'John', age: 21 },
  { id: 4, lastName: 'Aquino', firstName: 'Mark', age: 24 },
  { id: 5, lastName: 'Solo', firstName: 'Vhina', age: null },
  { id: 6, lastName: 'Devela', firstName: null, age: 21 },
  { id: 7, lastName: 'Paulos', firstName: 'Rae', age: 22 },
  { id: 8, lastName: 'Laput', firstName: 'Isobel', age: 21 },
  { id: 9, lastName: 'Cando', firstName: 'Allen', age: 22 },
];

const reportSeries = [
  { data: [18, 24, 20, 27], label: 'Generated', color: brand.orange },
  { data: [12, 19, 17, 23], label: 'Reported', color: brand.ink },
];

const pieSeries = [
  {
    data: [
      { id: 0, value: 14, label: 'Grooming', color: brand.orange },
      { id: 1, value: 10, label: 'Training', color: '#fb923c' },
      { id: 2, value: 8, label: 'Boarding', color: '#fdba74' },
      { id: 3, value: 6, label: 'Adoption', color: brand.ink },
    ],
  },
];

function ReportsPage() {
  const printRef = useRef(null);

  const handlePrint = () => {
    if (!printRef.current) {
      return;
    }

    openPrintReport({
      title: 'Reports Summary',
      description:
        'Analytics overview for generated reports, service category breakdown, and completion performance.',
      contentHtml: printRef.current.outerHTML,
    });
  };

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
          <Typography sx={dashboardEyebrowSx}>Analytics</Typography>
          <Typography component="h1" sx={dashboardPageTitleSx}>
            Reports
          </Typography>
          <Typography sx={dashboardSubtitleSx}>
            Report analytics showing generated output, category share, and current completion performance.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Generate</Button>
          <Button variant="outlined" onClick={handlePrint}>
            Print PDF
          </Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Card sx={dashboardCardSx}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Compares how reports were generated and completed across the last four months.
            </Typography>
            <BarChart
              series={reportSeries}
              height={300}
              colors={[brand.orange, brand.ink]}
              xAxis={[
                {
                  data: ['January', 'February', 'March', 'April'],
                  scaleType: 'band',
                  label: 'Months',
                },
              ]}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ ...dashboardCardSx, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Service Category Share
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Distribution of report requests by pet care category for the current period.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart series={pieSeries} width={280} height={220} />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ ...dashboardCardSx, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Percentage of reports completed on time for the latest reporting cycle.
              </Typography>
              <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gauge width={180} height={180} value={78} sx={{ [`& .MuiGauge-valueText`]: { fill: brand.ink } }} />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card sx={dashboardCardSx}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Report Records
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              autoHeight
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: brand.orangeLight,
                  borderBottom: `2px solid ${brand.border}`,
                  fontWeight: 800,
                },
                '& .MuiDataGrid-cell': {
                  borderColor: '#e5e5e5',
                },
              }}
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
