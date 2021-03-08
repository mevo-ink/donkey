import { useState, useEffect, useContext } from 'react'
import { LobbyContext } from 'utils/LobbyContext'

import { CircularProgress } from '@chakra-ui/react'

import database from 'utils/firebase'

export default function HourGlass ({ playerID, children }) {
  const [lobby] = useContext(LobbyContext)

  const [time, setTime] = useState(0)

  useEffect(() => {
    if (lobby.host === playerID) {
      for (let i = 0; i <= 20; i++) {
        setTimeout(() => {
          database().ref(`${lobby.name}/table/time`).set(i)
        }, 1000 * i)
      }
    } // eslint-disable-next-line
  }, [lobby.table?.turn])

  useEffect(() => {
    lobby.table && setTime(lobby.table?.time)
    // eslint-disable-next-line
  }, [lobby.table?.time])

  return (
    <CircularProgress
      value={lobby.table && playerID === lobby.table.turn && time / 20 * 100}
      color='lime'
      position='absolute'
    >
      {children}
    </CircularProgress>
  )
}
