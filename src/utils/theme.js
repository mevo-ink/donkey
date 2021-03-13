import { extendTheme } from '@chakra-ui/react'

import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  ipad: '1024px',
  mobile: '425px',
  base: '0px'
})
const theme = extendTheme({
  breakpoints
})

export default theme
