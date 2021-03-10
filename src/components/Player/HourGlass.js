import { useRef, useEffect, useContext } from 'react'
import { LobbyContext } from 'utils/LobbyContext'

import { CircularProgress } from '@chakra-ui/react'

import database from 'utils/firebase'
import bot from 'utils/GameLogic/bot'

export default function HourGlass ({ playerID, children }) {
  const timer = useRef()

  const [lobby] = useContext(LobbyContext)

  useEffect(() => {
    if (lobby.host === playerID && lobby.state === 'LOBBY') {
      timer.current = setInterval(async () => {
        if (!lobby.lastOnline) {
          if (lobby.table?.time >= 1) {
            // end round
            clearInterval(timer.current)
            bot(lobby)
          } else {
            database().ref(`${lobby.name}/table/time`).set(lobby.table?.time + 1)
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
    } // eslint-disable-next-line
  }, [lobby.table?.time, lobby.lastOnline])

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
