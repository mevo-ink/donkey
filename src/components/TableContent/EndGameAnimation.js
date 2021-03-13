import { useLobby } from 'context/LobbyContext'

import { Text } from '@chakra-ui/react'

export default function EndGameAnimation () {
  const lobby = useLobby()

  const donkeyPlayer = lobby.players[lobby.donkey]

  return (
    <Text
      fontSize='24px'
      lineHeight='24px'
      width='69px'
      textAlign='center'
    >
      END GAME
      {donkeyPlayer.nickname} IS THE DONKEY
    </Text>
  )
}
