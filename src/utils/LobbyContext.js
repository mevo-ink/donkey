import { useState, createContext } from 'react'

export const LobbyContext = createContext()

export const LobbyProvider = ({ children }) => {
  const [lobby, setLobby] = useState()
  return (
    <LobbyContext.Provider value={[lobby, setLobby]}>
      {children}
    </LobbyContext.Provider>
  )
}
