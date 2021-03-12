import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'
import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import LobbyHostOffline from 'components/Lobby/LobbyHostOffline'

import { Grid } from '@chakra-ui/react'

import LobbyInfo from 'components/Lobby/LobbyInfo'

import Table from 'components/Lobby/Table'
import PreLobbyGuest from 'components/PreLobby/PreLobbyGuest'
import PreLobbyHost from 'components/PreLobby/PreLobbyHost'

import preloadCardImages from 'utils/cards'

export default function PreLobby () {
  const lobby = useLobby()

  const myPlayerID = window.localStorage.getItem('playerID')

  usePlayerDisconnect(lobby)

  useEffect(() => {
    preloadCardImages()
  }, [])

  let tableContent = (
    myPlayerID === lobby.host
      ? <PreLobbyHost lobby={lobby} />
      : <PreLobbyGuest />
  )

  const isLobbyHostOnline = !lobby.lastOnline
  if (!isLobbyHostOnline) {
    tableContent = (
      <LobbyHostOffline />
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
