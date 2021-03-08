import { useRef, useEffect, useContext } from 'react'
import { LobbyContext } from 'utils/LobbyContext'

import { CircularProgress } from '@chakra-ui/react'

import database from 'utils/firebase'

export default function HourGlass ({ playerID, children }) {
  const timer = useRef()

  const [lobby] = useContext(LobbyContext)

  useEffect(() => {
    if (lobby.host === playerID) {
      timer.current = setInterval(async () => {
        if (!lobby.lastOnline && lobby.state === 'LOBBY') {
          if (lobby.table.time >= 20) {
            // end round
            clearInterval(timer.current)
            // force the current player to play a card - BOT
            // select a random playable card from current player's stack
            // call onPlayCard(card)
          } else {
            database().ref(`${lobby.name}/table/time`).set(lobby.table.time + 1)
          }
        }
      }, 1000)
      if (lobby.lastOnline) {
        // waiting for new room owner
        clearInterval(timer.current)
      }
    } else {
      timer.current && clearInterval(timer.current)
    }
    return () => {
      clearInterval(timer.current)
    }
  }, [lobby.table.time, lobby.lastOnline])

  return (
    <CircularProgress
      value={lobby.table && playerID === lobby.table.turn && lobby.table.time / 20 * 100}
      color='lime'
      position='absolute'
    >
      {children}
    </CircularProgress>
  )
}
