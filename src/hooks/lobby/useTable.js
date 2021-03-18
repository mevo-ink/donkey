import { useState, useEffect } from 'react'

import database from 'utils/firebase'

export const useTables = () => {
  const lobbyName = window.location.pathname.slice(9)

  const [tables, setTables] = useState({})

  useEffect(() => {
    // find the lobby
    database().ref(`${lobbyName}/tables`).on('value', (snapshot) => {
      setTables(snapshot.val())
    }, console.log)
    // eslint-disable-next-line
  }, [])

  // add any setters or getters if necessary

  return tables
}
