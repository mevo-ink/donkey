import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import { ChakraProvider } from '@chakra-ui/react'

import App from './App'

import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
