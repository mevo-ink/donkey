import { useState, useEffect } from 'react'

import { LobbyProvider } from 'context/LobbyContext'

import Background from 'components/Background'

import Loading from 'components/Loading'

import LobbyNotFound from 'components/LobbyManager/LobbyNotFound'
import LobbyIsFull from 'components/LobbyManager/LobbyIsFull'
import JoinLobby from 'components/LobbyManager/JoinLobby'

import Lobby from 'components/Lobby'
import PreLobby from 'components/PreLobby'

import Error from 'components/Error'

import database from 'utils/firebase'

export default function LobbyManager ({ name }) {
  const myPlayerID = window.localStorage.getItem('playerID')

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
  const isCurrentPlayerInRoom = lobby?.players[myPlayerID]?.nickname

  let render

  if (!isCurrentPlayerInRoom) {
    // check if lobby is full
    if (lobby.maxPlayers === Object.keys(lobby.players).length) {
      render = <LobbyIsFull />
    } else {
      // prompt the player to join
      render = <JoinLobby />
    }
  } else if (['LOBBY', 'DEALING', 'ENDGAME'].includes(lobby.state)) {
    render = <Lobby />
  } else {
    render = <PreLobby />
  }

  return (
    <LobbyProvider value={lobby}>
      <Background>
        {render}
      </Background>
    </LobbyProvider>
  )
}

/*
  settings:
    - host
    - maxPlayers
    - name
    - timeLimit
  players:
    []:
      - playerID
      - nickname
      - avatar
  table:
    - state (PRE_LOBBY, DEALING, LOBBY, ENDGAME)
    - donkey (playerID)
    - turn (playerID)
    - cards:
      []:
        - cardID
        - suite
        - number
        - holder (playerID or table or null)
*/
