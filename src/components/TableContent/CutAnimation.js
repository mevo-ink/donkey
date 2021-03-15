import { useEffect } from 'react'

import database from 'utils/firebase'

import { useLobby } from 'context/LobbyContext'

import { Text } from '@chakra-ui/react'

export default function CutAnimation () {
  const lobby = useLobby()

  const gotCuttedPlayer = lobby.getPlayer(lobby.gotCut.playerID)

  useEffect(() => {
    setTimeout(() => {
      if (lobby.getMyself().playerID === lobby.host) {
        // move existing pile cards to the player who got cut
        lobby.movePileCardsToPlayer(lobby.gotCut.playerID)
        // add cut card to got cutted player's hand
        lobby.addCardToPlayer(lobby.gotCut.card, lobby.gotCut.playerID)
        // change turn
        lobby.changeTurn(lobby.gotCut.playerID)
        // update firebase
        database().ref(`${lobby.name}/table`).set(lobby.table)
        database().ref(`${lobby.name}/gotCut`).set(null)
        // check for winning condition
        if (lobby.isEndGame()) {
          lobby.emptyDiscard()
          database().ref(`${lobby.name}`).update({
            state: 'END_GAME',
            donkey: lobby.getPlayerIDsWithCards()[0]
          })
        }
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
      {gotCuttedPlayer.nickname} GOT CUT!!
    </Text>
  )
}
