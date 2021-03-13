import { useEffect } from 'react'

import database from 'utils/firebase'

import { useLobby } from 'context/LobbyContext'

import { Text } from '@chakra-ui/react'

export default function DiscardPileAnimation () {
  const lobby = useLobby()

  useEffect(() => {
    setTimeout(() => {
      // change turn
      lobby.changeTurn(lobby.getHighestPlayerIDFromPile())
      // discard the pile
      lobby.discardPile()
      // update firebase
      database().ref(`${lobby.name}/table`).set(lobby.table)
      database().ref(`${lobby.name}/pileFull`).set(null)
      // check for winning condition
      if (lobby.isEndGame()) {
        lobby.emptyDiscard()
        database().ref(`${lobby.name}`).update({
          state: 'END_GAME',
          donkey: lobby.getPlayerIDsWithCards()[0]
        })
      }
    }, 5000) // eslint-disable-next-line
  }, [])

  return (
    <Text
      fontSize='24px'
      lineHeight='24px'
      width='69px'
      textAlign='center'
    >
      SHOW PILE DISCARDING ANIMATION !!
    </Text>
  )
}
