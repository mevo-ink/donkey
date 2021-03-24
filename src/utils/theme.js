import { extendTheme } from '@chakra-ui/react'

import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  ipad: '48rem',
  iphone8: '26rem',
  iphone6: '23rem',
  iphone5: '20rem'
})

let theme = extendTheme({
  styles: {
    global: {
      html: {
        background: 'linear-gradient(180deg, rgba(54, 60, 105, 1) 0%, #222646 100%)',
        width: '100vw',
        height: '-webkit-fill-available',
        overflow: 'hidden'
      },
      body: {
        background: 'linear-gradient(180deg, rgba(54, 60, 105, 1) 0%, #222646 100%)',
        width: '100vw',
        height: '75vh',
        minHeight: '-webkit-fill-available',
        overflow: 'hidden'
      }
    }
  },
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
