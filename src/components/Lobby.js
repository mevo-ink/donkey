import {
  Text,
  Grid
} from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'

import Table from 'components/Lobby/Table'

import { useEffect } from 'react'

import { getCards } from 'utils/cards'

import database from 'utils/firebase'

export default function Lobby ({ lobby }) {
  const playerID = window.localStorage.getItem('playerID')

  const players = Object.values(lobby.players).filter(({ lastOnline }) => !lastOnline)

  const cards = getCards()

  const deal = (playerIndex) => {
    const card = cards.pop()
    const player = players[playerIndex]
    database().ref(`${lobby.name}/players/${player.playerID}/cards`).push(card)
    playerIndex = (playerIndex + 1) % players.length
    return playerIndex
  }

  useEffect(() => {
    if (playerID === lobby.host && lobby.state === 'DEALING') {
      database().ref(`${lobby.name}`).update({
        state: 'DEALING'
      })

      let playerIndex = 0

      setInterval(() => {
        if (cards.length > 0) {
          playerIndex = deal(playerIndex)
        } else {
          database().ref(`${lobby.name}`).update({
            state: 'LOBBY'
          })
        }
      }, 300)
    }
  }, [])

  let tableContent = (
    <Text>
      PLAYING GAME
    </Text>
  )

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
    >
      <LobbyInfo lobby={lobby} />
      <Table lobby={lobby} tableContent={tableContent} />
    </Grid>
  )
}
