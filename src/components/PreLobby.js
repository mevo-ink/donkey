import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'
import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import { Grid } from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'

import Table from 'components/Lobby/Table'
import PreLobbyGuest from 'components/PreLobby/PreLobbyGuest'
import PreLobbyHost from 'components/PreLobby/PreLobbyHost'

import preloadCardImages from 'utils/cards'

export default function PreLobby () {
  const lobby = useLobby()

  const playerID = window.localStorage.getItem('playerID')

  usePlayerDisconnect(lobby)

  useEffect(() => {
    preloadCardImages()
  }, [])

  const tableContent = (
    playerID === lobby.host
      ? <PreLobbyHost lobby={lobby} />
      : <PreLobbyGuest />
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
