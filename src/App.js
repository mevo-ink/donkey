import useServiceWorker from 'hooks/useServiceWorker'
import useFingerprint from 'hooks/useFingerprint'

import {
  Box
} from '@chakra-ui/react'

function App () {
  useServiceWorker()
  useFingerprint()

  return (
    <Box>
      Hello World
    </Box>
  )
}

export default App
