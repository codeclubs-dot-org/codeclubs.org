import { createMuiTheme, colors } from '@material-ui/core'
import shadows from './shadows'
import typography from './typography'

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#ADDE4F'
    },
    secondary: {
      main: '#2C4961'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.common.white
    }
  },
  fontFamily: {
    sans: '"Roboto Slab", sans',
    display: '"Roboto Mono", monospace'
  },
  shadows,
  typography
})

export default theme
