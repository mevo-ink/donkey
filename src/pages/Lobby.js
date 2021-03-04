import { useState, useEffect } from 'react'

import Loading from 'components/Loading'

import LobbyNotFound from 'components/LobbyAlerts/LobbyNotFound'
import LobbyIsFull from 'components/LobbyAlerts/LobbyIsFull'
import JoinLobby from 'components/LobbyAlerts/JoinLobby'

import PreLobby from 'components/GameLobby/PreLobby'

import Error from 'components/Error'

import database from 'utils/firebase'

export default function GameLobby ({ name }) {
  const playerID = window.localStorage.getItem('playerID')

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(false)

  const [lobby, setLobby] = useState({})

  useEffect(() => {
    // find the lobby
    database().ref(name).on('value', (snapshot) => {
      setLobby(snapshot.val())
      setTimeout(() => setIsLoading(false), 600)
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

  return <PreLobby lobby={lobby} />
}
