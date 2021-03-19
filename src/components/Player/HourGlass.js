import { useRef, useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { CircularProgress } from '@chakra-ui/react'

export default function HourGlass ({ playerID, position }) {
  const timer = useRef()

  const lobby = useLobby()

  useEffect(() => {
    if (lobby.amIHost() && lobby.table.state === 'GAME' && lobby.table.turn === playerID) {
      timer.current = setInterval(() => {
        if (lobby.isHostOnline()) {
          if (!lobby.isPlayerOnline(lobby.table.turn)) {
            clearInterval(timer.current)
            lobby.bot()
          } else if (lobby.table.time >= lobby.settings.timeLimit) {
            // player ran out of time; make bot play a card
            clearInterval(timer.current)
            lobby.bot()
          } else {
            lobby.incrementTime()
          }
        }
      }, 1000)
      if (!lobby.isHostOnline()) {
        // waiting for new lobby owner
        clearInterval(timer.current)
      }
    } else {
      timer.current && clearInterval(timer.current)
    }
    return () => {
      clearInterval(timer.current)
    } // eslint-disable-next-line
  }, [lobby.table.time, lobby.isHostOnline(), lobby.table.turn])

  return (
    <CircularProgress
      value={playerID === lobby.table.turn && lobby.table.time / lobby.settings.timeLimit * 100}
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
