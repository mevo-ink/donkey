import { useEffect, useContext } from 'react'

import { Text, Flex } from '@chakra-ui/react'

import LoadingInline from 'components/LoadingInline'

import { LobbyContext } from 'utils/LobbyContext'

import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import database from 'utils/firebase'

export default function LobbyHostOffline () {
  const [lobby] = useContext(LobbyContext)

  usePlayerDisconnect(lobby)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // choose a random online player - except the current lobby host
      const newHost = Object.values(lobby.players).find(player => {
        return player.playerID !== lobby.host && !player.lastOnline
      })
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
