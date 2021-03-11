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
  const context = useContext(LobbyContext)
  if (context === undefined) {
    throw new Error('useLobby must be used within a LobbyProvider')
  }
  return context
}
