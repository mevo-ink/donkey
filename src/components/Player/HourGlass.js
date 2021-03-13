import { useRef, useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { CircularProgress } from '@chakra-ui/react'

import database from 'utils/firebase'
import bot from 'utils/GameLogic/bot'

const TIME_LIMIT = 20

export default function HourGlass ({ playerID }) {
  const timer = useRef()

  const lobby = useLobby()

  useEffect(() => {
    if (lobby.host === playerID && lobby.state === 'LOBBY') {
      timer.current = setInterval(async () => {
        if (!lobby.lastOnline) {
          if (lobby.table?.time >= TIME_LIMIT) {
            // player ran out of time; make bot play a card
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
  }, [lobby.table?.time, lobby.lastOnline, lobby.table.turn])

  return (
    <CircularProgress
      value={lobby.table && playerID === lobby.table.turn && lobby.table.time / TIME_LIMIT * 100}
      color={lobby.table.time > 15 ? 'red' : lobby.table.time > 10 ? 'orange' : 'lime'}
      // trackColor='transparent'
      position='absolute'
      size='35px'
      thickness='10px'
    />
  )
}
