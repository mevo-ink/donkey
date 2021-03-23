import { useLobby } from 'context/LobbyContext'

import { Grid } from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'
import Table from 'components/Table'
import MyHand from 'components/Table/Player/MyHand'

export default function Game () {
  const lobby = useLobby()

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
    >
      <LobbyInfo />
      <Table />
      {lobby.table.state !== 'PREGAME' && <MyHand />}
    </Grid>
  )
}
