import { useRef, useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { CircularProgress } from '@chakra-ui/react'

import database from 'utils/firebase'

export default function HourGlass ({ playerID, position }) {
  const timer = useRef()

  const lobby = useLobby()

  useEffect(() => {
    if (lobby.host === playerID && lobby.state === 'LOBBY') {
      timer.current = setInterval(() => {
        if (!lobby.lastOnline) {
          if (lobby.players[lobby.table.turn].lastOnline) {
            lobby.bot()
          } else if (lobby.table?.time >= lobby.timeLimit) {
            // player ran out of time; make bot play a card
            lobby.bot()
            clearInterval(timer.current)
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
      value={lobby.table && playerID === lobby.table.turn && lobby.table.time / lobby.timeLimit * 100}
      color={lobby.table.time > 15 ? 'red' : lobby.table.time > 10 ? 'orange' : 'lime'}
      trackColor='transparent'
      position='absolute'
      {...position}
      size='33px'
      mb='-2px'
      zIndex='5'
      thickness='10px'
    />
  )
}
