import { useEffect } from 'react'

import database from 'utils/firebase'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import cardBack from 'images/cardBack.png'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function DiscardPileAnimation () {
  const lobby = useLobby()

  const players = lobby.getPlayers()

  const numberOfPlayers = players.length

  const playersPosition = lobby.getSeatingPositions().map(([_, __, playerPosition]) => playerPosition)

  const newPlayersPosition = []

  for (let i = 0; i < players.length; i += numberOfPlayers) {
    newPlayersPosition.push(...playersPosition)
  }

  useEffect(() => {
    setTimeout(() => {
      // change turn
      lobby.changeTurn(lobby.getHighestPlayerIDFromPile())
      // discard the pile
      lobby.discardPile()
      // update firebase
      database().ref(`${lobby.name}/table`).set(lobby.table)
      database().ref(`${lobby.name}/pileFull`).set(null)
      // check for winning condition
      if (lobby.isEndGame()) {
        lobby.emptyDiscard()
        database().ref(`${lobby.name}`).update({
          state: 'END_GAME',
          donkey: lobby.getPlayerIDsWithCards()[0]
        })
      }
    }, 5000) // eslint-disable-next-line
  }, [])

  return (
    newPlayersPosition.map((pos, idx) => (
      <MotionImage
        key={idx}
        src={cardBack}
        width='20px'
        objectFit='contain'
        position='absolute'
        initial={{ opacity: 0, scale: 1.5, x: pos.x, y: pos.y }}
        animate={{ opacity: [1, 0], x: 0, y: 0, transition: { delay: (1 + idx) / 2, duration: 1 } }}
      />
    ))
  )
}
