import { useState, useEffect } from 'react'

import database from 'utils/firebase'

export const usePlayers = () => {
  const lobbyName = window.location.pathname.slice(9)

  const [players, setPlayers] = useState({})

  useEffect(() => {
    // find the lobby
    database().ref(`${lobbyName}/players`).on('value', (snapshot) => {
      setPlayers(snapshot.val())
    }, console.log)
    // eslint-disable-next-line
  }, [])

  // add any setters or getters if necessary

  return players
}
