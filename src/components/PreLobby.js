import preloadCardImages from 'utils/cards'

import {
  Grid
} from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'

import Table from 'components/Lobby/Table'

import { useEffect } from 'react'

export default function PreLobby ({ lobby }) {
  useEffect(() => {
    preloadCardImages()
  }, [])

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
    >
      <LobbyInfo lobby={lobby} />
      <Table lobby={lobby} />
    </Grid>
  )
}
