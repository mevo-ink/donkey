import { useState, useEffect } from 'react'

import database from 'utils/firebase'

export const useSettings = () => {
  const lobbyName = window.location.pathname.slice(9)

  const [settings, setSettings] = useState({})

  useEffect(() => {
    // find the lobby
    database().ref(`${lobbyName}/settings`).on('value', (snapshot) => {
      setSettings(snapshot.val())
    }, console.log)
    // eslint-disable-next-line
  }, [])

  // add any setters or getters if necessary

  return settings
}
