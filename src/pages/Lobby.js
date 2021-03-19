import { useState, useEffect } from 'react'

import { LobbyProvider } from 'context/LobbyContext'

import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import Background from 'components/Background'

import Loading from 'components/Loading'

import LobbyNotFound from 'components/Lobby/LobbyNotFound'
import LobbyIsFull from 'components/Lobby/LobbyIsFull'
import JoinLobby from 'components/Lobby/JoinLobby'

import Game from 'components/Game'

import Error from 'components/Error'

import database from 'utils/firebase'
import preloadCardImages from 'utils/cards'

export default function LobbyManager ({ name }) {
  const myPlayerID = window.localStorage.getItem('playerID')

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(false)

  const [lobby, setLobby] = useState()

  usePlayerDisconnect(lobby?.settings)

  useEffect(() => {
    // preload card images to browser cache
    preloadCardImages()
    // find the Game
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
  const isCurrentPlayerInLobby = lobby.players[myPlayerID]?.nickname

  let render

  if (!isCurrentPlayerInLobby) {
    // check if lobby is full
    if (lobby.settings.maxPlayers === Object.keys(lobby.players).length) {
      render = <LobbyIsFull />
    } else {
      // prompt the player to join
      render = <JoinLobby />
    }
  } else {
    render = <Game />
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
      - playerID
      - lastOnline
    - maxPlayers
    - name
    - timeLimit
  players:
    []:
      - playerID
      - nickname
      - avatar
  table:
    - seatings [playerID, playerID, ...]
    - state (PREGame, DEALING, Game, ENDGame)
    - donkey (playerID)
    - turn (playerID)
    - cards:
      []:
        - cardID
        - suite
        - number
        - playerID
        - holder (PLAYER or TABLE or DISCARD)
*/
