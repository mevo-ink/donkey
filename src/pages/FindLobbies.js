import { useRef, useEffect, useState } from 'react'

import { useTitle } from 'hookrouter'

import {
  Box,
  Text,
  Icon,
  VStack,
  Button
} from '@chakra-ui/react'

import Error from 'components/Error'

import LobbyInfo from 'components/FindLobbies/LobbyInfo'

import Loading from 'components/Loading'

import database from 'utils/firebase'

export default function FindLobbies () {
  useTitle('Find Lobbies')

  const containerRef = useRef()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const [lobbies, setLobbies] = useState([])

  useEffect(() => {
    database().ref().on('value', async (snapshot) => {
      const lobbies = Object.values(snapshot.val() || {})
      setLobbies(lobbies)
      setIsLoading(false)
    }, setError)
  }, [])

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Loading marginTop='-100px' />
  }

  return (
    <Box
      width='200px'
      zIndex='0'
      mt='-57px'
    >
      <Text
        fontSize='48px'
        lineHeight='48px'
        fontWeight='bold'
        mb='15px'
      >
        Lobbies
      </Text>
      <VStack
        ref={containerRef}
        spacing={4}
        height='395px'
        overflowY='scroll'
        sx={{
          /* Works on Chrome, Edge, and Safari */
          '::-webkit-scrollbar': {
            display: 'none'
          },
          /* Works on Firefox */
          '&': {
            scrollbarWidth: 'none'
          }
        }}
      >
        {lobbies.map(lobby => <LobbyInfo key={lobby.settings.name} lobby={lobby} />)}
        {lobbies.length === 0 && <Text fontSize='lg'>No active lobbies</Text>}
      </VStack>
      {lobbies.length > 0 && (
        <Box width='100%' textAlign='center' onClick={() => containerRef.current.scrollBy(0, 200)}>
          <Icon width='15px' height='9px' viewBox='0 0 15 9' fill='none'>
            <path d='M0 1.698L1.76812 0L7.5025 5.6034L13.2319 0L15 1.698L7.5025 9L0 1.698Z' fill='white' fillOpacity='0.7' />
          </Icon>
        </Box>
      )}
      <Box width='100%' textAlign='center' mt={2}>
        <Button colorScheme='purple' onClick={() => { window.location.href = '/' }}>
          Go Back
        </Button>
      </Box>
    </Box>
  )
}
