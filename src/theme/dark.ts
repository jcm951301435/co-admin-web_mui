import { ThemeOptions } from '@mui/material/styles/createTheme'
import {
  indigo,
  pink,
  orange,
  red,
  blue,
  green,
  grey,
  amber,
} from '@mui/material/colors'

export const lightThemeOptions: ThemeOptions = {
  typography: {
    // 中文字符和日文字符通常比较大，
    fontSize: 12,
  },
  palette: {
    mode: 'dark',
    primary: {
      // main: indigo[500],
      main: green[300],
      light: green[400],
      dark: green[800],
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
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      default: '#303030',
      paper: grey[800],
    },
  },
}

export default lightThemeOptions
