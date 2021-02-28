import { useEffect } from 'react'

import {
  Box
} from '@chakra-ui/react'

import CreateRoom from 'components/CreateRoom'

export default function Home () {
  useEffect(() => {
    // clean the url
    window.history.replaceState(null, null, '/')
  }, [])

  return (
    <Box>
      <CreateRoom />
    </Box>
  )
}
