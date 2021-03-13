import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'
import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import { Grid } from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'

import Table from 'components/Table'

import preloadCardImages from 'utils/cards'

export default function PreLobby () {
  const lobby = useLobby()

  usePlayerDisconnect(lobby)

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
