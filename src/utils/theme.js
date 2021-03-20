import { extendTheme } from '@chakra-ui/react'

import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  ipad: '48rem',
  iphone8: '26rem',
  iphone6: '23rem',
  iphone5: '20rem'
})

let theme = extendTheme({
  components: {
    Popover: {
      baseStyle: {
        popper: {
          width: 'fit-content',
          maxWidth: 'fit-content'
        }
      }
    }
  }
})

theme = {
  ...theme,
  breakpoints
}

export default theme
