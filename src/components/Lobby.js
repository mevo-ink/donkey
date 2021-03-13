import { useRef, useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'
import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import { Grid } from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'
import Table from 'components/Table'
import PlayerHand from 'components/Player/PlayerHand'

import { getCards } from 'utils/cards'
import database from 'utils/firebase'

export default function Lobby () {
  const dealingTimer = useRef()

  const lobby = useLobby()

  const myPlayerID = window.localStorage.getItem('playerID')

  usePlayerDisconnect(lobby)

  const cards = getCards()

  useEffect(() => {
    if (myPlayerID === lobby.host && lobby.state === 'DEALING') {
      database().ref(`${lobby.name}`).update({
        state: 'DEALING',
        table: null
      })

      let playerIndex = 0

      dealingTimer.current = setInterval(() => {
        if (cards.length > 0) {
          playerIndex = lobby.dealPlayerCard(playerIndex, cards.pop())
        } else {
          clearInterval(dealingTimer.current)
          database().ref(`${lobby.name}`).update({
            state: 'LOBBY'
          })
        }
      }, 500)
      return () => {
        clearInterval(dealingTimer.current)
      }
    } // eslint-disable-next-line
  }, [])

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
    >
      <LobbyInfo />
      <Table />
      <PlayerHand player={lobby.players[myPlayerID]} />
    </Grid>
  )
}
