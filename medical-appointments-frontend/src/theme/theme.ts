import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/material/locale';


const baseTheme = {
  palette: {
    primary: {
      main: '#2e7d32', 
      light: '#5fa463',
      dark: '#1e5a21',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1976d2', 
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: [
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
};


const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        padding: '8px 16px',
      },
    },
    variants: [
      {
        props: { variant: 'contained' },
        style: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    ],
  },
  MuiCard: {
    styleOverrides: {
      root: {
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        width: 36,
        height: 36,
        fontSize: '0.9rem',
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
  },
};


const theme = createTheme(
  {
    ...baseTheme,
    components,
  },
  esES
);


export { theme };
export default theme;