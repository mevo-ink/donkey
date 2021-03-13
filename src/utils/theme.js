import { extendTheme } from '@chakra-ui/react'

import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  desktop: '1000px',
  ipad: '500px',
  mobile: '0px'
})
const theme = extendTheme({
  breakpoints
})

export default theme
