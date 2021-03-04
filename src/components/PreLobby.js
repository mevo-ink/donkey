import preloadCardImages from 'utils/cards'

import {
  Text,
  Grid,
  Button
} from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'

import Table from 'components/Lobby/Table'

import { useEffect } from 'react'

import database from 'utils/firebase'

export default function PreLobby ({ lobby }) {
  const playerID = window.localStorage.getItem('playerID')

  useEffect(() => {
    preloadCardImages()
  }, [])

  const onStartGame = () => {
    database().ref(`${lobby.name}`).update({
      state: 'LOBBY'
    })
  }

  let tableContent = (
    <Text>
      NORMAL USER I M WAINGAG
    </Text>
  )

  if (playerID === lobby.host) {
    tableContent = (
      <Button colorScheme='purple' onClick={onStartGame}>START GMAE</Button>
    )
  }

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
