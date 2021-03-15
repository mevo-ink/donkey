import { extendTheme } from '@chakra-ui/react'

import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  ipad: '768px',
  iphone8: '414px',
  iphone6: '375px',
  iphone5: '320px',
  mobile: '0px'
})
const theme = extendTheme({
  breakpoints,
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

export default theme
