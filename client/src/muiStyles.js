import { createTheme } from '@mui/material/styles';

export const orderTabStyles = createTheme({
  components: {
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
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: '30px 0'
        }
      }
    }
  }
});
