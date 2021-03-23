import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Text, Flex } from '@chakra-ui/react'

import LoadingInline from 'components/LoadingInline'

export default function LobbyHostOffline () {
  const lobby = useLobby()

  useEffect(() => {
    const timeout = setTimeout(async () => {
      // choose a random online player - excluding the current GAME host
      const playerID = lobby.findNewHost().playerID
      if (playerID) {
        await lobby.setNewHost(playerID)
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
