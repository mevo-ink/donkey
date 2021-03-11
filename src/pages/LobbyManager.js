import { useState, useEffect } from 'react'

import { LobbyProvider } from 'context/LobbyContext'

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

  const [lobby, setLobby] = useState()

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

  let render

  if (!currentPlayer || !currentPlayer.nickname) {
    // check if lobby is full
    if (lobby.maxPlayers === Object.keys(lobby.players).length) {
      return <LobbyIsFull />
    } else {
      // prompt the player to join
      render = <JoinLobby />
    }
  }

  if (['LOBBY', 'DEALING', 'END_GAME'].includes(lobby.state)) {
    render = <Lobby />
  } else {
    render = <PreLobby />
  }

  return (
    <LobbyProvider value={lobby}>
      {render}
    </LobbyProvider>
  )
}
