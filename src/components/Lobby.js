import { useRef, useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'
import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import {
  Box,
  Text,
  Grid
} from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'
import Table from 'components/Lobby/Table'
import PlayerHand from 'components/Player/PlayerHand'
import Dealing from 'components/Lobby/Dealing'
import LobbyHostOffline from 'components/Lobby/LobbyHostOffline'

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

  let tableContent = (
    <Box>
      <Text>
        {lobby.table && lobby.players[lobby.table.turn]?.nickname} 's TURN
      </Text>
    </Box>
  )

  if (lobby.state === 'DEALING') {
    tableContent = (
      <Dealing />
    )
  }

  if (lobby.gotCut) {
    tableContent = (
      <Text>
        {lobby.players[lobby.gotCut.playerID].nickname} GOT CUTTED
      </Text>
    )
  }

  if (lobby.pileFull) {
    tableContent = (
      <Text>
        PILE IS FULL
      </Text>
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

  const isLobbyHostOnline = !lobby.lastOnline
  if (!isLobbyHostOnline) {
    tableContent = (
      <LobbyHostOffline />
    )
  }

  // { lobby.table && myPlayerID === lobby.table.turn && <Text position='absolute' color='black'>MY TURN</Text> }

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
    >
      <LobbyInfo />
      <Table tableContent={tableContent} />
      <PlayerHand player={lobby.players[myPlayerID]} />
    </Grid>
  )
}
