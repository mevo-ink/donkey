import { useEffect, useContext } from 'react'

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
import Dealing from 'components/Lobby/Dealing'

import { getCards } from 'utils/cards'
import database from 'utils/firebase'
import { LobbyContext } from 'utils/LobbyContext'

export default function Lobby () {
  const [lobby] = useContext(LobbyContext)

  const playerID = window.localStorage.getItem('playerID')

  usePlayerDisconnect(lobby)

  const players = Object.values(lobby.players).filter(({ lastOnline }) => !lastOnline)

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
    if (card.number === 1 && card.suite === 'spades') {
      database().ref(`${lobby.name}/table`).set({
        turn: player.playerID,
        time: 0
      })
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
      }, 1000)
    } // eslint-disable-next-line
  }, [])

  let tableContent = (
    <Box>
      <Text>
        {lobby.table && lobby.players[lobby.table.turn]?.nickname} 's TURN
      </Text>
      <Image width='80px' objectFit='contain' src={lobby.table?.pile && (Object.values(lobby.table.pile)[0]).url} />
    </Box>
  )

  if (lobby.state === 'DEALING') {
    tableContent = (
      <Dealing />
    )
  }

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
      <LobbyInfo />
      <Table tableContent={tableContent} />
      <PlayerHand player={lobby.players[playerID]} />
    </Grid>
  )
}
