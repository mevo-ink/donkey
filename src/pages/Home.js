import { useEffect } from 'react'

import {
  Box
} from '@chakra-ui/react'

export default function Home () {
  useEffect(() => {
    // clean the url
    window.history.replaceState(null, null, '/')
  }, [])

  return (
    <Box>
      HOME
    </Box>
  )
}
