import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'
import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import { Text, Flex } from '@chakra-ui/react'

import LoadingInline from 'components/LoadingInline'

import database from 'utils/firebase'

export default function LobbyHostOffline () {
  const lobby = useLobby()

  const players = lobby.getPlayers()

  usePlayerDisconnect(lobby)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // choose a random online player - excluding the current lobby host
      const newHost = players.find(({ playerID, lastOnline }) => playerID !== lobby.host && !lastOnline)
      if (newHost) {
        database().ref(`${lobby.name}`).update({
          host: newHost.playerID,
          lastOnline: null
        })
      }
    }, 5000)
    return () => {
      clearTimeout(timeout)
    } // eslint-disable-next-line
  }, [])

  return (
    <Flex
      width='100%'
      height='100%'
      bg='rgba(0, 0, 0, 0.5)'
      placeItems='center'
      overflow='hidden'
      borderRadius='200px'
      flexDirection='column'
      justifyContent='center'
      fontWeight='bold'
      position='absolute'
    >
      <Text
        fontSize='24px'
        lineHeight='34px'
        width='auto'
        textAlign='center'
      >
        Host <br /> Disconnected! <br /> Choosing <br /> a <br /> New <br /> Host
      </Text>
      <LoadingInline />
    </Flex>
  )
}
