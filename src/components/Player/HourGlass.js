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
          if (!lobby.isPlayerOnline(lobby.table.turn) && lobby.table.time > 2) {
            // play bot after 2 secs delay if player is offline
            clearInterval(timer.current)
            // lobby.bot()
          } else if (lobby.table.time >= lobby.settings.timeLimit) {
            // player ran out of time; make bot play a card
            clearInterval(timer.current)
            // lobby.bot()
          } else {
            lobby.incrementTime()
          }
        }
      }, 1000)
    }
    if (!lobby.isHostOnline()) {
      // waiting for new lobby owner
      clearInterval(timer.current)
    }
    if (lobby.table.gotCut) {
      clearInterval(timer.current)
    }
    if (lobby.table.tableCardsFull) {
      clearInterval(timer.current)
    }
    if (lobby.table.state === 'ENDGAME') {
      clearInterval(timer.current)
    }
    return () => {
      clearInterval(timer.current)
    } // eslint-disable-next-line
  }, [
    lobby.table.state,
    lobby.table.time,
    lobby.settings.host.lastOnline,
    lobby.table.turn,
    lobby.table.gotCut,
    lobby.table.tableCardsFull
  ])

  let value = lobby.table.time / lobby.settings.timeLimit * 100
  if (playerID !== lobby.table.turn) value = 0
  if (lobby.table.gotCut) value = 0
  if (lobby.table.tableCardsFull) value = 0

  return (
    <CircularProgress
      value={value}
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
