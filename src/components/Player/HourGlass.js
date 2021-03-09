import { useRef, useEffect, useContext } from 'react'
import { LobbyContext } from 'utils/LobbyContext'

import { CircularProgress } from '@chakra-ui/react'

import onPlayCard from 'utils/GameLogic/onPlayCard'

import database from 'utils/firebase'

const randomCardPicker = function (obj) {
  const keys = Object.keys(obj)
  return obj[keys[keys.length * Math.random() << 0]]
}

export default function HourGlass ({ playerID, children }) {
  const timer = useRef()

  const [lobby] = useContext(LobbyContext)

  useEffect(() => {
    if (lobby.host === playerID && lobby.state === 'LOBBY') {
      timer.current = setInterval(async () => {
        if (!lobby.lastOnline) {
          if (lobby.table?.time >= 5) {
            // end round
            clearInterval(timer.current)
            // force the current player to play a card - BOT
            // select a random playable card from current player's stack
            const myCards = Object.values(lobby.table?.cards || {})
              .filter(card => card.playerID === playerID)
            let randomCard
            if (lobby.table.pile) {
              randomCard = Object.values(myCards || {})
                .filter(card => card.suite === lobby.table.pile[0].suite)
              randomCard = randomCard[0]
              // player don't have a suitable card, CUT with a random card
              if (!randomCard) {
                randomCard = randomCardPicker(myCards)
              }
            } else {
              // choose a random card if there is no card the table
              randomCard = randomCardPicker(myCards)
            }
            // call onPlayCard(card)
            onPlayCard(randomCard, playerID, lobby, myCards)
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
