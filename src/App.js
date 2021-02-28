import useServiceWorker from 'hooks/useServiceWorker'

import {
  Box
} from '@chakra-ui/react'

function App () {
  useServiceWorker()

  return (
    <Box>
      Hello World
    </Box>
  )
}

export default App
