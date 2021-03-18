import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import { useLobby } from 'context/LobbyContext'

import { Grid } from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'
import Table from 'components/Table'
import PlayerHand from 'components/Player/PlayerHand'

export default function Game () {
  const lobby = useLobby()

  usePlayerDisconnect(lobby.settings)

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
    >
      <LobbyInfo />
      <Table />
      {lobby.table.state !== 'PREGAME' && <PlayerHand />}
    </Grid>
  )
}
