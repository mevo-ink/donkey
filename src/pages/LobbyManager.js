import { useState, useEffect, useContext } from 'react'

import LobbyHostOffline from 'components/LobbyManager/LobbyHostOffline'

import Loading from 'components/Loading'

import LobbyNotFound from 'components/LobbyManager/LobbyNotFound'
import LobbyIsFull from 'components/LobbyManager/LobbyIsFull'
import JoinLobby from 'components/LobbyManager/JoinLobby'

import Lobby from 'components/Lobby'
import PreLobby from 'components/PreLobby'

import Error from 'components/Error'

import database from 'utils/firebase'
import { LobbyContext } from 'utils/LobbyContext'

export default function LobbyManager ({ name }) {
  const playerID = window.localStorage.getItem('playerID')

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(false)

  const [lobby, setLobby] = useContext(LobbyContext)

  useEffect(() => {
    // find the lobby
    database().ref(name).on('value', (snapshot) => {
      setLobby(snapshot.val())
      setIsLoading(false)
    }, setError)
    // eslint-disable-next-line
  }, [])

  if (isLoading) return <Loading />

  if (error) return <Error error={error} />

  if (!lobby) return <LobbyNotFound name={name} />

  // check if the current player is in the lobby
  const currentPlayer = lobby && lobby.players && lobby.players[playerID]

  if (!currentPlayer || !currentPlayer.nickname) {
    // check if lobby is full
    if (lobby.maxPlayers === Object.keys(lobby.players).length) {
      return <LobbyIsFull />
    } else {
      // prompt the player to join
      return <JoinLobby />
    }
  }

  const isLobbyHostOnline = !lobby.lastOnline

  if (!isLobbyHostOnline) {
    return <LobbyHostOffline />
  }

  if (['LOBBY', 'DEALING', 'END_GAME'].includes(lobby.state)) {
    return <Lobby />
  } else {
    return <PreLobby />
  }
}
