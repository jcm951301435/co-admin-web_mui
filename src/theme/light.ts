import { ThemeOptions } from '@mui/material/styles/createTheme'
import { indigo, pink, orange, red, blue, green, grey } from '@mui/material/colors'

export const lightThemeOptions: ThemeOptions = {
  typography: {
    // 中文字符和日文字符通常比较大，
    fontSize: 12,
    fontFamily: ['Roboto', 'Noto Sans SC', 'Helvetica Neue', 'sans-serif'].join(','),
  },
  palette: {
    mode: 'light',
    primary: {
      main: indigo[500],
      light: indigo[400],
      dark: indigo[800],
    },
    secondary: {
      main: pink[400],
      light: pink[300],
      dark: pink[700],
    },
    warning: {
      main: orange[500],
      light: orange[300],
      dark: orange[700],
    },
    error: {
      main: red[500],
      light: red[300],
      dark: red[700],
    },
    info: {
      main: blue[500],
      light: blue[300],
      dark: blue[700],
    },
    success: {
      main: green[500],
      light: green[300],
      dark: green[700],
    },
    background: {
      default: grey[100],
      paper: '#fff',
    },
  },
}

export default lightThemeOptions
