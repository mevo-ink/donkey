import { useState, useEffect } from 'react'

import LobbyHostOffline from 'components/LobbyManager/LobbyHostOffline'

import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import Loading from 'components/Loading'

import LobbyNotFound from 'components/LobbyManager/LobbyNotFound'
import LobbyIsFull from 'components/LobbyManager/LobbyIsFull'
import JoinLobby from 'components/LobbyManager/JoinLobby'

import Lobby from 'components/Lobby'
import PreLobby from 'components/PreLobby'

import Error from 'components/Error'

import database from 'utils/firebase'

export default function LobbyManager ({ name }) {
  const playerID = window.localStorage.getItem('playerID')

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(false)

  const [lobby, setLobby] = useState({})

  usePlayerDisconnect(lobby)

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

  if (!currentPlayer) {
    // check if lobby is full
    if (lobby.maxPlayers === Object.keys(lobby.players).length) {
      return <LobbyIsFull lobby={lobby} />
    } else {
      // prompt the player to join
      return <JoinLobby lobby={lobby} />
    }
  }

  const isLobbyHostOnline = !lobby.lastOnline

  if (!isLobbyHostOnline) {
    return <LobbyHostOffline lobby={lobby} />
  }

  if (['LOBBY', 'DEALING'].includes(lobby.state)) {
    return <Lobby lobby={lobby} />
  } else {
    return <PreLobby lobby={lobby} />
  }
}
