import { createTheme } from '@mui/material/styles';

export const brand = {
  orange: '#ea580c',
  orangeLight: '#fff7ed',
  ink: '#171717',
  muted: '#525252',
  border: '#171717',
  surface: '#fafaf9',
  cardShadow: '8px 8px 0px 0px rgba(24, 24, 27, 1)',
};

export const dashboardCardSx = {
  backgroundColor: '#fff',
  border: `2px solid ${brand.border}`,
  borderRadius: '24px',
  boxShadow: brand.cardShadow,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
};

export const dashboardPageTitleSx = {
  fontSize: { xs: 32, md: 40 },
  fontWeight: 900,
  color: brand.ink,
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  mb: 1,
};

export const dashboardSubtitleSx = {
  color: brand.muted,
  fontSize: 16,
  lineHeight: 1.6,
};

export const dashboardEyebrowSx = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.28em',
  color: brand.orange,
  mb: 1,
};

export const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: brand.orange,
      contrastText: '#fff',
    },
    secondary: {
      main: brand.ink,
    },
    text: {
      primary: brand.ink,
      secondary: brand.muted,
    },
    background: {
      default: brand.surface,
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    h4: { fontWeight: 900, color: brand.ink },
    h6: { fontWeight: 800, color: brand.ink },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: 10,
          fontWeight: 700,
          padding: '10px 20px',
          boxShadow: 'none',
        },
        contained: {
          border: `2px solid ${brand.border}`,
          '&:hover': {
            boxShadow: '4px 4px 0px 0px rgba(24, 24, 27, 1)',
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: brand.border,
          color: brand.ink,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: brand.orangeLight,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...dashboardCardSx,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 9999,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            '& fieldset': {
              borderWidth: 2,
              borderColor: brand.border,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `2px solid ${brand.border}`,
          borderRadius: 24,
          boxShadow: brand.cardShadow,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: brand.orangeLight,
            fontWeight: 800,
            color: brand.ink,
            borderBottom: `2px solid ${brand.border}`,
          },
        },
      },
    },
  },
});
