import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import { ChakraProvider } from '@chakra-ui/react'
import { LobbyProvider } from 'utils/LobbyContext'

import App from './App'

import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <LobbyProvider>
        <App />
      </LobbyProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
