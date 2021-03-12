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
  const onlinePlayers = []
  const offlinePlayers = []
  for (const player of Object.values(lobby.players)) {
    player.lastOnline ? offlinePlayers.push(player) : onlinePlayers.push(player)
  }
  return { onlinePlayers, offlinePlayers }
}

export const usePlayerCards = (playerID) => {
  const lobby = useLobby()
  return Object.values(lobby.table?.cards || {})
    .filter(card => card.playerID === playerID)
}
