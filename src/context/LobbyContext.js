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

export const usePlayers = () => {
  const lobby = useLobby()

  const onlinePlayers = Object.values(lobby.players).filter(({ lastOnline }) => !lastOnline)

  const offlinePlayers = Object.values(lobby.players).filter(({ lastOnline }) => lastOnline)

  return { onlinePlayers, offlinePlayers }
}
