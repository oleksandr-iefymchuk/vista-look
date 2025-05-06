import { createTheme } from '@mui/material/styles';

export const orderTabStyles = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          padding: '10px 0'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          width: 'auto',
          fontSize: '16px',
          borderBottom: '3px solid #fff',
          marginRight: '10px',
          padding: '5px',
          '&:hover': {
            background: 'transparent',
            borderBottom: '3px solid #008ec8'
          }
        }
      }
    }
  }
});
