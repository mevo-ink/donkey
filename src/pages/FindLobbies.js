import { useEffect, useState } from 'react'

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

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const [lobbies, setLobbies] = useState([])

  useEffect(() => {
    database().ref().on('value', async (snapshot) => {
      const lobbies = Object.values(snapshot.val() || {})
      setLobbies(lobbies)
      // delete lobbies if inactive for more than 15 mins
      if (lobbies) {
        for (const lobby of Object.values(lobbies)) {
          const currentTime = new Date().getTime()
          if (parseInt((currentTime - lobby.lastOnline) / 1000) > 900) {
            database().ref(lobby.name).set(null)
          }
        }
      }
      setTimeout(() => setIsLoading(false), 1000)
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
        spacing={4}
        height='395px'
        overflowY='arun99'
        css={{
          '&::-webkit-scrollbar': {
            width: '0px'
          }
        }}
      >
        {lobbies.map(lobby => <LobbyInfo key={lobby.name} lobby={lobby} />)}
        {lobbies.length === 0 && (
          <>
            <Text>No active lobbies</Text>
            <Button colorScheme='purple' onClick={() => { window.location.href = '/' }}>
              Go Back
            </Button>
          </>
        )}
      </VStack>
      {lobbies.length > 0 && (
        <Box width='100%' textAlign='center'>
          <Icon width='15px' height='9px' viewBox='0 0 15 9' fill='none'>
            <path d='M0 1.698L1.76812 0L7.5025 5.6034L13.2319 0L15 1.698L7.5025 9L0 1.698Z' fill='white' fillOpacity='0.7' />
          </Icon>
        </Box>
      )}
    </Box>
  )
}
