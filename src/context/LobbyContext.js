import {
  useContext,
  createContext
} from 'react'

export const LobbyContext = createContext()

export const LobbyProvider = ({ value, children }) => {
  return (
    <LobbyContext.Provider value={value}>
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobby = () => {
  const lobby = useContext(LobbyContext)
  if (lobby === undefined) {
    throw new Error('useLobby must be used within a LobbyProvider')
  }
  return lobby
}

export const useLobbyHost = () => {
  const lobby = useLobby()
  return lobby.players[lobby.host]
}

export const usePlayers = () => {
  const lobby = useLobby()
  return Object.values(lobby.players)
}

export const usePlayerCards = (playerID) => {
  const lobby = useLobby()
  return Object.values(lobby.table?.cards || {})
    .filter(card => card.playerID === playerID)
}

export const useMyCards = () => {
  const lobby = useLobby()
  const myPlayerID = window.localStorage.getItem('playerID')
  return Object.values(lobby.table?.cards || {})
    .filter(({ playerID }) => playerID === myPlayerID)
}
