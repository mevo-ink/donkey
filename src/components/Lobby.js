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

  const players = lobby.getPlayers()

  const myPlayerID = window.localStorage.getItem('playerID')

  usePlayerDisconnect(lobby)

  const cards = getCards()

  const dealCard = (playerIndex) => {
    const card = cards.pop()
    const player = players[playerIndex]
    const cardID = `${card.number}-of-${card.suite}`
    database().ref(`${lobby.name}/table/cards/${cardID}`).set({
      ...card,
      cardID,
      playerID: player.playerID
    })
    if (card.number === 14 && card.suite === 'spades') {
      database().ref(`${lobby.name}/table`).update({
        turn: player.playerID,
        time: 0
      })
    }
    playerIndex = (playerIndex + 1) % players.length
    return playerIndex
  }

  useEffect(() => {
    if (myPlayerID === lobby.host && lobby.state === 'DEALING') {
      database().ref(`${lobby.name}`).update({
        state: 'DEALING'
      })

      let playerIndex = 0

      dealingTimer.current = setInterval(() => {
        if (cards.length > 0) {
          playerIndex = dealCard(playerIndex)
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
