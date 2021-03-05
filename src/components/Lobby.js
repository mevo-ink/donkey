import { useEffect } from 'react'

import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import {
  Box,
  Text,
  Grid,
  Image
} from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'
import Table from 'components/Lobby/Table'
import PlayerHand from 'components/Player/PlayerHand'

import { getCards } from 'utils/cards'
import database from 'utils/firebase'

export default function Lobby ({ lobby }) {
  const playerID = window.localStorage.getItem('playerID')

  usePlayerDisconnect(lobby)

  const players = Object.values(lobby.players).filter(({ lastOnline }) => !lastOnline)

  const cards = getCards()

  const dealCard = (playerIndex) => {
    const card = cards.pop()
    const player = players[playerIndex]
    database().ref(`${lobby.name}/players/${player.playerID}/cards/${card.number}-of-${card.suite}`).set(card)
    if (card.number === 1 && card.suite === 'spades') {
      database().ref(`${lobby.name}/table/turn`).set(player.playerID)
    }
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
          playerIndex = dealCard(playerIndex)
        } else {
          database().ref(`${lobby.name}`).update({
            state: 'LOBBY'
          })
        }
      }, 300)
    }
  }, [])

  let tableContent = (
    <Box>
      <Text>
        {lobby.table && lobby.players[lobby.table.turn].nickname} 's TURN
      </Text>
      <Image width='80px' objectFit='contain' src={lobby.table?.pile && Object.values(lobby.table.pile)[Object.values(lobby.table.pile).length - 1].url} />
    </Box>

  )

  if (lobby.donkey) {
    const donkeyPlayer = lobby.players[lobby.donkey]
    tableContent = (
      <Text>
        {donkeyPlayer.nickname} IS THE DONKEY
      </Text>
    )
  }

  // { lobby.table && playerID === lobby.table.turn && <Text position='absolute' color='black'>MY TURN</Text> }

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
    >
      <LobbyInfo lobby={lobby} />
      <Table lobby={lobby} tableContent={tableContent} />
      <PlayerHand lobby={lobby} player={lobby.players[playerID]} />
    </Grid>
  )
}
